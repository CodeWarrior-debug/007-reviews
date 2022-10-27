import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>007-Reviews</title>
          <meta
            name="description"
            content="Bond movies, reviewed by cinephiles of sophistication."
          />
          <link
            rel="icon"
            href="\74-745626_transparent-james-bond-silhouette-png-james-bond-icon.png"
          />
        </Head>

        <main>
          <Navbar />

          <h1 className="top-title">
            Bond, James Bond. Reviewed.
          </h1>


          {/* TODO cluster of images, charts here? */}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}
