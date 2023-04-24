import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main>
          <h1 className={styles.h1}>Welcome</h1>
          <hr className={styles.hr}/>
      </main>
    </>
  )
}