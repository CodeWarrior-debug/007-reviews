import Head from "next/head";
// import Link from "next/link";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <>
      {/* <div> */}
        <Head>
          <title>007-Reviews</title>
          <meta
            name="description"
            content="Bond movies, reviewed by cinephiles of sophistication."
            
          />
          {/* <Link
            rel="icon"
            href="/74-745626_transparent-james-bond-silhouette-png-james-bond-icon.png"
          /> */}

        </Head>

        <main>
          <Navbar />

          <h1 className="top-title">Bond, James Bond. Reviewed.</h1>

          {/* TODO cluster of images, charts here? */}
        </main>
      {/* </div> */}
    </>
  );
}
