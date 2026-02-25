import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Custom404: React.FC = () => {
  return (
    <>
      <div className="bg-[#161616] text-white min-h-screen">
        <Navbar />
        <div className="grid place-items-center min-h-[80vh]">
          <div className="grid place-items-center px-8 md:px-24 lg:px-48">
            <h1 className="text-5xl leading-loose text-transparent bg-gradient-to-r bg-clip-text from-[#BF953F] via-[#FCF6ba] to-[#AA771c] font-extrabold">PAGE NOT FOUND</h1>
            <p className="text-2xl text-center text-gray-300">
              This page was collateral damage in Bond&apos;s most recent mission.
              <br />Q will be furious when he finds out, so keep it confidential
              and return to&nbsp;
              <Link href="/" className="font-bold text-[#BF953F] hover:text-[#FCF6ba] transition-colors duration-200">
                headquarters.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
