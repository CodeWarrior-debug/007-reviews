import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {doc, setDoc, getFirestore,Timestamp} from "firebase/firestore"
import React, { useState } from "react";
import {auth, firebaseConfig} from "../lib/db"
import { useRouter } from "next/router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const signUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });

          // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    

      const setUpUser = async () =>{
        const userRef = doc(db, 'users', email);
        await setDoc(userRef, { updated: Timestamp.fromDate(new Date()) }, { merge: true });
        router.push('/filmography')
      }

      setUpUser();

  };

  return (
    <div>
      <form onSubmit={signUp}>
        <h1 className="font-extrabold text-2xl">Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputBox"
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputBox"
        ></input>
        <button type="submit" className="bg-black text-white h-11 rounded pl-4 pr-4 font-semibold m-2 ">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;