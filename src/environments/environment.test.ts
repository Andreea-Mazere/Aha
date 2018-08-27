// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCSZie882b8Gej0r1cwcA5h3vSxcyQbvNI",
    authDomain: "aha-test-environment.firebaseapp.com",
    databaseURL: "https://aha-test-environment.firebaseio.com",
    projectId: "aha-test-environment",
    storageBucket: "aha-test-environment.appspot.com",
    messagingSenderId: "126365890069"
  }
};
