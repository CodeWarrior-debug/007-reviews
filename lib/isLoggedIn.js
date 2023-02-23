import { getAuth, onAuthStateChanged  } from "firebase/auth";
import {app} from "./db"

const auth = getAuth(app);
const user = auth.currentUser;



onAuthStateChanged(auth, (user) =>{
  

  if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // isLoggedIn = true;
      console.log(user)


      // ...
    } else {
      // User is signed out
      // user = null
      // isLoggedIn=false;
      console.log("no user no more")
    }
}) 



