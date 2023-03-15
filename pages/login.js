import React from "react";
import AuthDetails from "../components/AuthDetails";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <div className="bg-[#161616] text-white min-h-screen">
        <Navbar />

        <div className="grid place-items-center h-[93vh]">
          
          <SignIn />
          <SignUp />
          <AuthDetails />

        </div>
      </div>
    </>
  );
};

export default Login;
