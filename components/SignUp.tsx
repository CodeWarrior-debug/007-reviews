import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore, Timestamp } from "firebase/firestore";
import React, { useState, FormEvent } from "react";
import { auth, firebaseConfig } from "../lib/db";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuthEmail] = useState("");
  const router = useRouter();

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setAuthEmail(email);
      })
      .catch((error) => {
        console.log(error);
      });

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const setUpUser = async () => {
      e.preventDefault();
      const userRef = doc(db, "users", email);
      await setDoc(
        userRef,
        { updated: Timestamp.fromDate(new Date()) },
        { merge: true }
      );
      localStorage.setItem("userEmail", email);
      router.push("/filmography");
    };

    setUpUser();
  };

  return (
    <div>
      <form onSubmit={signUp}>
        <h1 className="font-extrabold text-2xl text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#252429] border border-[#BF953F]/30 rounded-lg p-3 m-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#BF953F] transition-all duration-200"
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#252429] border border-[#BF953F]/30 rounded-lg p-3 m-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#BF953F] transition-all duration-200"
        ></input>
        <button
          type="submit"
          className="bg-transparent border border-[#BF953F] text-[#FCF6ba] hover:bg-[#BF953F]/20 transition-all duration-300 font-semibold h-11 rounded pl-4 pr-4 m-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
