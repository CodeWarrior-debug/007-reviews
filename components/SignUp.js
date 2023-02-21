import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {auth} from "../lib/db"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
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