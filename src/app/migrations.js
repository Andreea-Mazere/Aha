var admin = require('firebase-admin');

const args = process.argv.slice(2);

if (args.length != 2) {
  console.log('usage: node migrations.js path-to-service-credentials creators-initial-password');
  process.exit();
}

let serviceAccount = require(args[0]);
var creatorsInitialPassword = args[1];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://aha-dev-environment.firebaseio.com'
});

const adminEmail = 'creators.aha@gmail.com';

admin.auth().getUserByEmail(adminEmail)
  .catch(error => {
    if (error.errorInfo.code !== 'auth/user-not-found')
      throw error;
    console.log(error.errorInfo.message, ' => creating seed admin user:', adminEmail);
    return admin.auth().createUser({
        email: adminEmail,
        password: creatorsInitialPassword,
        emailVerified: true,
        displayName: "Creators",
        disabled: false
    })
  })
  .then(setAdminClaim)
  .catch(rejection => {
    console.log('unhandled rejection: ' + rejection)
  })
  .then(cleanup);

function setAdminClaim (userRecord) {
  return new Promise((resolve, reject) => {
    const customClaims = userRecord.customClaims || {};
    if (customClaims.admin === true){
      console.log("Admin claim already present");
      resolve(userRecord);
      return;
    }
    customClaims.admin = true;
    admin.auth().setCustomUserClaims(userRecord.uid, customClaims)
      .then(() => {
        console.log("Successfully added admin claim");
        resolve(userRecord);
      })
      .catch(reject);
  });
}

function cleanup() {
  if (admin.apps.length > 0){;
    admin.app().delete();
  }
}