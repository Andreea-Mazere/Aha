var admin = require('firebase-admin');

const args = process.argv.slice(2);

if (args.length != 1) {
  console.log('usage: node migrations.js path-to-service-credentials');
  process.exit();
}

process.on('unhandledRejection', function(err, promise) {
  console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
  if (admin.apps.length > 0){;
    admin.app().delete();
  }
  process.exit(-1);
});

//todo encrypt file and decrypt on cricleci
var serviceAccount = require(args[0]);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://aha-dev-environment.firebaseio.com'
});

const adminEmail = 'creators.aha@gmail.com';

admin.auth().getUserByEmail(adminEmail)
  .then(setAdminClaim)
  .catch(function(error) {
    if (error.errorInfo.code !== 'auth/user-not-found')
      throw error;
    console.log(error.errorInfo.message, ' => creating seed admin user:', adminEmail);
    admin.auth().createUser({
        email: adminEmail,
        emailVerified: false,
        displayName: "Creators",
        disabled: false
      })
        .then(setAdminClaim)
    });

function setAdminClaim (userRecord) {
  const customClaims = userRecord.customClaims || {};
  if (customClaims.admin){
    console.log("Admin claim already present");
    admin.app().delete();
    return;
  }
  customClaims.admin = true;
  admin.auth().setCustomUserClaims(userRecord.uid, customClaims)
    .then(() => {
      console.log("Successfully added admin claim");
      admin.app().delete();
    });
}