"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
let currentVersion = {
    major: 0,
    minor: 0
};
let seedData = functions.config().seed_data;
admin.initializeApp();
exports.onDeploy = functions.database.ref('/deploy/{pushId}')
    .onCreate((snapshot, context) => {
    return Promise.all([
        fillInDeployDetails(snapshot),
        seed()
    ]);
});
function seed() {
    return Promise.all([
        seedUser(),
        seedAwsConfig()
    ]);
}
function seedAwsConfig() {
    var ref = admin.database().ref("/config/thirdParty/aws");
    var awsCredentials = seedData.aws;
    console.log("seed aws config...");
    return ref.update({
        accessKeyId: awsCredentials.id,
        secretAccessKey: awsCredentials.key
    })
        .then(() => console.log("updated "))
        .catch(e => console.error("update error: ", e));
}
function seedUser() {
    console.log("seed user...");
    return admin.auth().listUsers(1)
        .then(function (listUsersResult) {
        if (listUsersResult.users.length > 0) {
            console.log("user(s) already present");
            return new Promise((resolve, reject) => resolve());
        }
        console.log("creating seed user...");
        return admin.auth().createUser({
            email: 'creators.aha@gmail.com',
            password: seedData.default_password,
            emailVerified: true,
            displayName: "Creators",
            disabled: false
        })
            .then(setAdminClaim);
    })
        .catch(e => console.error("seed user error: ", e));
}
function fillInDeployDetails(snapshot) {
    snapshot.ref.update({
        time: new Date(),
        version: currentVersion
    });
}
function setAdminClaim(userRecord) {
    return new Promise((resolve, reject) => {
        const customClaims = userRecord.customClaims || {};
        if (customClaims.admin === true) {
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
//# sourceMappingURL=index.js.map