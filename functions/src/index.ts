import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

let currentVersion = {
    major: 0,
    minor: 0
};

admin.initializeApp();

export const onDeploy = functions.database.ref('/deploy/{pushId}')
    .onCreate((snapshot, context) => {
        return Promise.all(
        [
            fillInDeployDetails(snapshot),
            seedData()
        ]);
    });

function seedData():Promise<any> {
    return admin.auth().listUsers(1)
    .then(function(listUsersResult) {
        if (listUsersResult.users.length > 0)
        {
            console.log("user(s) already present");
            return new Promise((resolve, reject) => resolve());
        }
        console.log("creating seed user...");
        return admin.auth().createUser({
            email: 'creators.aha@gmail.com',
            password: functions.config().seed_data.default_password,
            emailVerified: true,
            displayName: "Creators",
            disabled: false})    
        .then(setAdminClaim);
    });
}

function fillInDeployDetails(snapshot: functions.database.DataSnapshot) {
    snapshot.ref.update({
        time: new Date(),
        version: currentVersion
    });
}

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