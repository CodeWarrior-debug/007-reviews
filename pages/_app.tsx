import "../styles/globals.css";
import { Libre_Franklin } from "next/font/google";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import cls from "classnames";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../lib/queryClient";

const libre_franklin = Libre_Franklin({ style: "normal", subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <main className={cls(libre_franklin.className)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Component className="z-0" {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <Analytics />
        </main>
      </QueryClientProvider>
    </>
  );
}
