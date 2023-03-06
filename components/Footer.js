import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <>
    <br/>
      <div className=" grid place-items-center ">
        <p className=" text-center text-xl font-thin">
          <Link
            target="_blank"
            href="https://icons8.com/icon/19532/007"
            className="text-blue-400 hover:font-extrabold"
          >
            007
          </Link>{" "}
          icon by{" "}
          <Link
            target="_blank"
            href="https://icons8.com"
            className="text-blue-400 hover:font-extrabold"
          >
            Icons8
          </Link>
          
          <br />

          This product uses the{" "}

          <Link target="_blank" href="https://www.themoviedb.org/documentation/api" className="text-red-400 hover:font-extrabold" >

            TMDB API

          </Link>{" "}

          but is not endorsed or certified by{" "}

          <Link target="_blank" href="https://www.themoviedb.org/" className="text-red-400 hover:font-extrabold" >
            TMDB
          </Link>
          
        </p>

      </div>
    <br/>

    </>
  );
};

export default Footer;
