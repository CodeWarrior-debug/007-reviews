import '../styles/globals.css'
import {Libre_Franklin} from '@next/font/google'
import "tailwindcss/tailwind.css";

const libre_franklin = Libre_Franklin({style:'normal'},{subsets:["latin-ext"]})

export default function MyApp({Component, pageProps}){
  return (
    <main className={libre_franklin.className}>
      <Component {...pageProps} />
    </main>
  )
}