

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



//check Authorization

// export const auth = getAuth(app);


// Initialize Firebase
// export const analytics = getAnalytics(app);


// Video: https://www.youtube.com/watch?v=ut4p--4lV2s&list=PLitlfQssIkZfn60iGfsScabGYb1bIFgEq&index=20
//Below from https://stackoverflow.com/questions/70445014/module-not-found-error-package-path-is-not-exported-from-package



// Use this to initialize the firebase App
// const firebaseApp = initializeApp(firebaseConfig);

// Use these for db & auth
// const db = getFirestore(firebaseApp)
// const auth = getAuth(firebaseApp);
// auth
module.exports =  {  db, app, firebaseConfig };


