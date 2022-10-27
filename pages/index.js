import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ReactGFL from 'react-gfl'

export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>007-Reviews</title>
        <meta name="description" content="Bond Movies, Reviewed by cinephiles of sophistication." />
        <link rel="icon" href="\74-745626_transparent-james-bond-silhouette-png-james-bond-icon.png" />
      </Head>

      <main>
<>
      <ReactGFL
      fonts={[
        {
          font: 'Merriweather',
          weights: [700],
        },
        {
          font: 'Roboto Mono',
          weights: [400, 700],
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
      display={'swap'} 
      />

    <h1 style={{fontFamily: 'Merriweather'}}>Bond, James Bond. Reviewed.</h1>
</>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>

<p>
Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi
animcupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est
aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia
pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa
proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia
eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et
culpa duis.
</p>
</>
  )
}
