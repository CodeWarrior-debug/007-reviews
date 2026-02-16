import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="grid place-items-center mt-4 mb-4">
      <div className="text-sm text-gray-500 text-center">
        <p>
          <Link
            target="_blank"
            href="https://icons8.com/icon/19532/007"
            className="text-[#9f7928] hover:text-[#FCF6ba] hover:underline transition-colors duration-200"
          >
            007
          </Link>{" "}
          icon by{" "}
          <Link
            target="_blank"
            href="https://icons8.com"
            className="text-[#9f7928] hover:text-[#FCF6ba] hover:underline transition-colors duration-200"
          >
            Icons8
          </Link>
        </p>
        <p className="mt-2">
          This product uses the{" "}
          <Link
            target="_blank"
            href="https://www.themoviedb.org/documentation/api"
            className="text-[#9f7928] hover:text-[#FCF6ba] hover:underline transition-colors duration-200"
          >
            TMDB API
          </Link>{" "}
          but is not endorsed or certified by{" "}
          <Link
            target="_blank"
            href="https://www.themoviedb.org/"
            className="text-[#9f7928] hover:text-[#FCF6ba] hover:underline transition-colors duration-200"
          >
            TMDB
          </Link>
        </p>
        <p className="mt-2">
          A{" "}
          <Link
            target="_blank"
            href="https://github.com/CodeWarrior-debug"
            className="text-[#9f7928] hover:text-[#FCF6ba] hover:underline transition-colors duration-200"
          >
            CodeWarrior-debug
          </Link>{" "}
          production. View repository on{" "}
          <Link
            target="_blank"
            href="https://github.com/CodeWarrior-debug/007-reviews"
            className="text-[#9f7928] hover:text-[#FCF6ba] hover:underline transition-colors duration-200"
          >
            GitHub
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
