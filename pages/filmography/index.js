import React from "react";
import MovieCards from "../../components/MovieCards";
import Navbar from "../../components/Navbar.js";
import "tailwindcss/tailwind.css";

export default function Filmography() {
  return (
    <>
      <Navbar />
      <MovieCards />
    </>
  );
}
