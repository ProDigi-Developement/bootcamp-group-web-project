// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyAcp1XodVKrEm5LmwGw-VuZNE2OOnchFDQ",
    authDomain: "employees-ed3b8.firebaseapp.com",
    databaseURL: "https://employees-ed3b8.firebaseio.com",
    projectId: "employees-ed3b8",
    storageBucket: "",
    messagingSenderId: "947822209160"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
