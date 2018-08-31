"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
let currentVersion = {
    major: 0,
    minor: 0
};
admin.initializeApp();
exports.onDeploy = functions.database.ref('/deploy/{pushId}')
    .onCreate((snapshot, context) => {
    return Promise.all([
        fillInDeployDetails(snapshot),
        seedData()
    ]);
});
function seedData() {
    return admin.auth().listUsers(1)
        .then(function (listUsersResult) {
        if (listUsersResult.users.length > 0) {
            console.log("user(s) already present");
            return new Promise((resolve, reject) => resolve());
        }
        console.log("creating seed user...");
        return admin.auth().createUser({
            email: 'creators.aha@gmail.com',
            password: functions.config().seed_data.default_password,
            emailVerified: true,
            displayName: "Creators",
            disabled: false
        })
            .then(setAdminClaim);
    });
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