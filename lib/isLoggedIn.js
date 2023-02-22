import { getAuth, onAuthStateChanged  } from "firebase/auth";
import {app} from "./db"

const auth = getAuth(app);
const FBuser = auth.currentUser;
let isLoggedIn = Boolean;


onAuthStateChanged(auth, (user) =>{

  if (FBuser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      isLoggedIn = true;
      // ...
    } else {
      // User is signed out
      // user = null
      isLoggedIn=false;
    }
}) 



