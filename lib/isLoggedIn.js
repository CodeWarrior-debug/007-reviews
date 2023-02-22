import { getAuth } from "firebase/auth";
import {app} from "./db"

const auth = getAuth(app);
const user = auth.currentUser;

export const isLoggedIn = ()=>{
    if (user!==null){
        return true
    } else {
        return false
    }
}