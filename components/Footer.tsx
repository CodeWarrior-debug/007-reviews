import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="grid place-items-center mt-8 mb-4">
      <div className="text-sm text-gray-500 text-center">
        <span>
          <Link
            target="_blank"
            href="https://icons8.com/icon/19532/007"
            className="text-[#9f7928] hover:text-[#FCF6ba] transition-colors duration-200 hover:underline"
          >
            007
          </Link>{" "}
          icon by{" "}
          <Link
            target="_blank"
            href="https://icons8.com"
            className="text-[#9f7928] hover:text-[#FCF6ba] transition-colors duration-200 hover:underline"
          >
            Icons8
          </Link>
        </span>
        <p className="mt-2">
          This product uses the{" "}
          <Link
            target="_blank"
            href="https://www.themoviedb.org/documentation/api"
            className="text-[#9f7928] hover:text-[#FCF6ba] transition-colors duration-200 hover:underline"
          >
            TMDB API
          </Link>{" "}
          but is not endorsed or certified by{" "}
          <Link
            target="_blank"
            href="https://www.themoviedb.org/"
            className="text-[#9f7928] hover:text-[#FCF6ba] transition-colors duration-200 hover:underline"
          >
            TMDB
          </Link>
        </p>
        <p className="mt-2">
          A{" "}
          <Link
            target="_blank"
            href="https://github.com/CodeWarrior-debug"
            className="text-[#9f7928] hover:text-[#FCF6ba] transition-colors duration-200 hover:underline"
          >
            CodeWarrior-debug
          </Link>{" "}
          production. View repository on{" "}
          <Link
            target="_blank"
            href="https://github.com/CodeWarrior-debug/007-reviews"
            className="text-[#9f7928] hover:text-[#FCF6ba] transition-colors duration-200 hover:underline"
          >
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
