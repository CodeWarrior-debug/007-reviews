import "../styles/globals.css";
import { Libre_Franklin } from "next/font/google";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import cls from "classnames";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

const libre_franklin = Libre_Franklin({ style: "normal", subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <main className={cls(libre_franklin.className)}>
        <Component className="z-0" {...pageProps} />
        <Analytics />
      </main>
    </>
  );
}
