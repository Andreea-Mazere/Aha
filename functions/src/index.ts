import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from "cors"
import * as fileParser from 'express-multipart-file-parser'
import * as admin from 'firebase-admin';
import * as md5 from 'md5';
import {v1 as uuid} from 'uuid';
import { truncate } from 'fs';

//https://us-central1-aha-dev-environment.cloudfunctions.net/addWordCard?text=testul
const addWord = functions.https.onRequest((req, res) => {
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    let text = req.query.text;
    let card = {
        text: text, 
        imageUrl: 'http://coaching.worldrugby.org/images/keyfactors/passing.jpg', 
        soundUrl: 'https://firebasestorage.googleapis.com/v0/b/aha-dev-environment.appspot.com/o/speech%2Fpas%C4%83.mp3?alt=media&token=37ffb616-8031-45ec-8b53-dd2affb3633d' 
    };
    let ref = admin.database().ref('/').child('content').child('words').child(text);
    return ref.set(card).then(() => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, ref.toString());
    });
  });

declare global {
    namespace Express {
        interface Request {
            user: admin.auth.DecodedIdToken 
        }
    }
}
const validateFirebaseIdToken = (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>');
        res.status(403).send('Unauthorized');
        return;
    }
        
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    let idToken = req.headers.authorization.split('Bearer ')[1];

    admin.auth().verifyIdToken(idToken)
    .then(decodedIdToken => {
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        if (decodedIdToken.admin){
            next();
        }
        else {
            console.error('non-admin user');
            res.status(403).send('Unauthorized');
        }
    }).catch(error => {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    });
};

const requestLogger = (request, _, next) => {
  console.log('request: ', request);
  next();
};
function sanitizeFileName(original: string): string {
    let illegalRe = /[\/\?<>\\:\*\|":]/g;
    let controlRe = /[\x00-\x1f\x80-\x9f]/g;
    let sanitized = original
        .replace(illegalRe, '')
        .replace(controlRe, '');
    return sanitized;
}
function upload(reqFile: any):Promise<string> {
    return new Promise((resolve, reject) => {
        let bucket = admin.storage().bucket();
        let file = bucket.file(`test/${md5(reqFile.buffer)}-${sanitizeFileName(reqFile.originalname)}`);
        const stream = file.createWriteStream({
            metadata: {
                contentType: reqFile.mimetype
            },
            resumable: false
        });
        stream.on('error', (err) => {
            reject(err);
        });
        stream.on('finish', () => {
            //reqFile.cloudStorageObject = gcsname;
            file.makePublic()
                .then(() => {
                    return file.getMetadata();
                })
                .then(results => {
                    const metadata = results[0];
                    resolve(metadata['mediaLink']);
                });
        });
        stream.end(reqFile.buffer);
    });
}
  
// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp();
const app: express.Application = express();
let corsMiddleware = cors({
    allowedHeaders:"Authorization,Content-Type"
});
app.use(requestLogger);
app.use(corsMiddleware);
app.options("*", corsMiddleware);
app.use(fileParser);
app.use(validateFirebaseIdToken);
app.post("/test", (request, response) => {
    try {
        console.log('request user: ' + request.user);
        var email = request.user? request.user.email : null;
        response.send("Hello from Express on Firebase (cors preflight headers handler): " + email)
    }
    catch (e){
        response.status(500).send("error: " + e)
    }
});

app.put("/addImageFile", (req, res) => {
    let reqFile = req.files[0];
    if (! reqFile) {
        res.status(500).send('No image found.');
        return;
    }
    upload(reqFile)
        .then(url => {
            let ref = admin.database().ref('/').child('content').child('words').child(req.body.wordText);
            ref.update({imageUrl: url});
            res.status(200).send();
        })
        .catch(e => res.status(500).send(e));
});

export const api = functions.https.onRequest(app);

