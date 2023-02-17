import Head from "next/head";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>007-Reviews</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <main>

        <h2 className="top-title min-h-[80vh] grid place-items-center leading-12"> Bond. James Bond. <br /> <br /> Reviewed. </h2>


        {/* TODO cluster of images, charts here? */}
      </main>
    </>
  );
}
