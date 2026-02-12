import Footer from "../components/Footer";
import React from "react";
import AuthDetails from "../components/AuthDetails";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

const Login: React.FC = () => {
  return (
    <>
      <div className="bg-[#161616] text-white">
        <Navbar />

        <div className="grid place-items-center h-[93.4vh]">
          <SignIn />
          <SignUp />
          <AuthDetails />
        </div>
      </div>
    </>
  );
};

export default Login;
