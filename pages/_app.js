import '../styles/globals.css'
import {Libre_Franklin} from '@next/font/google'
import "tailwindcss/tailwind.css";
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';


const libre_franklin = Libre_Franklin({style:'normal'},{subsets:["latin"]})

export default function MyApp({Component, pageProps}){


  

  return (
    <>
    <Head>

      <link rel='icon' href='/favicon/favicon.ico'/>
    </Head>

    <main className={libre_franklin.className}>
      <Navbar className="min-h-[10vh]" />
      <Component {...pageProps} />
      <Footer/>
    </main>
    </>
  )
}