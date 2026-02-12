import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <>
      <br />
      <div className="grid place-items-center">
        <p className="text-xl font-thin text-center ">
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
          <Link
            target="_blank"
            href="https://www.themoviedb.org/documentation/api"
            className="text-red-400 hover:font-extrabold"
          >
            TMDB API
          </Link>{" "}
          but is not endorsed or certified by{" "}
          <Link
            target="_blank"
            href="https://www.themoviedb.org/"
            className="text-red-400 hover:font-extrabold"
          >
            TMDB
          </Link>
          <p>
            A{" "}
            <Link
              target="_blank"
              href="https://github.com/CodeWarrior-debug"
              className="text-blue-400 underline"
            >
              CodeWarrior-debug
            </Link>{" "}
            production. View repository on{" "}
            <Link
              target="_blank"
              href="https://github.com/CodeWarrior-debug/007-reviews"
              className="text-blue-400 underline"
            >
              GitHub
            </Link>{" "}
          </p>
        </p>
      </div>
      <br />
    </>
  );
};

export default Footer;
