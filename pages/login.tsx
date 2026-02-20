import Footer from "../components/Footer";
import React from "react";
import AuthDetails from "../components/AuthDetails";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const Login: React.FC = () => {
  return (
    <>
      <div className="bg-[#161616] text-white min-h-screen">
        <Navbar />

        <div className="grid place-items-center min-h-[85vh] py-8">
          <div className="bg-[#1e1e1e] rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl shadow-black/50 ring-1 ring-[#BF953F]/20">
            <SignIn />
            <hr className="border-[#BF953F]/30 my-6" />
            <SignUp />
            <hr className="border-[#BF953F]/30 my-6" />
            <AuthDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
