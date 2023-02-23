import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { auth } from "../lib/db";
import { useRouter } from "next/router";
import { AuthContext } from "../lib/context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {setAuthEmail, authEmail} = useContext(AuthContext)

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthEmail(email)
        console.log(authEmail);
        console.log(userCredential);
        router.push('/filmography')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={signIn}>
        <h1 className="font-extrabold text-2xl">Log In to your Account</h1>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputBox"
        ></input>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputBox"
        ></input>
        <button type="submit" className="bg-black text-white h-11 rounded pl-4 pr-4 font-semibold m-2">Log In</button>
        
      </form>
    </div>
  );
};

export default SignIn;