import '../styles/globals.css'
import {Libre_Franklin} from '@next/font/google'
import "tailwindcss/tailwind.css";
import Head from 'next/head'
import Link from 'next/link'
import { useContext, createContext } from 'react';
// import { AuthContext } from '../lib/context';
import { useState } from 'react';

const libre_franklin = Libre_Franklin({style:'normal'},{subsets:["latin"]})

export default function MyApp({Component, pageProps}){


  return (
    <>
    <Head>

      <link rel='icon' href='/favicon/favicon.ico'/>
    </Head>

        <main className={libre_franklin.className}>
          <Component {...pageProps} />
        </main>

    </>
  )
}