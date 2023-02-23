import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import { AuthContext } from "../lib/context";
import { useContext } from "react";

export default function Home() {
  const user = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>007-Reviews</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <main>
      <Navbar className="min-h-[10vh]" />

        <h2 className="top-title min-h-[80vh] grid place-items-center leading-12"> Bond. James Bond. <br /> <br /> Reviewed. </h2>
        <h2>{user}</h2>



        {/* TODO cluster of images, charts here? */}
      </main>
      <Footer/>
      
    </>
  );
}
