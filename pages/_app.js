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

  // const AuthorizedContext= createContext(true)
  // const loggedIn = useContext(authorizedContext)
  
  // const [user, setUser] = useState("")


  return (
    <>
    <Head>

      <link rel='icon' href='/favicon/favicon.ico'/>
    </Head>

    {/* <AuthorizedContext.Provider value=""> */}
      {/* <AuthContext.Provider value={user}> */}
        <main className={libre_franklin.className}>
          <Component {...pageProps} />
        </main>
      {/* </AuthContext.Provider> */}

    {/* </AuthorizedContext.Provider> */}
    </>
  )
}