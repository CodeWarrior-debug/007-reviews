// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/compat/auth"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

//check Authorization

// export const auth = getAuth(app);


// Initialize Firebase
// export const analytics = getAnalytics(app);


// Video: https://www.youtube.com/watch?v=ut4p--4lV2s&list=PLitlfQssIkZfn60iGfsScabGYb1bIFgEq&index=20
//Below from https://stackoverflow.com/questions/70445014/module-not-found-error-package-path-is-not-exported-from-package

// const firebaseConfig = {
//   apiKey: "AIzaSyBOK7x5N5UnjY4TDqndzH7l5tvdNIsWFRc",
//   authDomain: "todo-app-e3cf0.firebaseapp.com",
//   projectId: "todo-app-e3cf0",
//   storageBucket: "todo-app-e3cf0.appspot.com",
//   messagingSenderId: "940016886081",
//   appId: "1:940016886081:web:91686613f16b1b1f8001c0",
//   measurementId: "G-JHPC7TP12K"
// };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };