import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, FormEvent } from "react";
import { auth } from "../lib/db";
import { useRouter } from "next/router";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("userEmail", email);
        router.push("/filmography");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={signIn}>
        <h1 className="font-extrabold text-2xl text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c]">Log In to your Account</h1>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#252429] border border-[#BF953F]/30 rounded-lg p-3 m-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#BF953F] transition-all duration-200"
        ></input>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#252429] border border-[#BF953F]/30 rounded-lg p-3 m-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#BF953F] transition-all duration-200"
        ></input>
        <button
          type="submit"
          className="bg-transparent border border-[#BF953F] text-[#FCF6ba] hover:bg-[#BF953F]/20 transition-all duration-300 font-semibold h-11 rounded pl-4 pr-4 m-2"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
