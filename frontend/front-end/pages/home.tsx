import Head from 'next/head'
import Header from '../components/Header'
import Intro from '../components/Intro'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <main>
                <Intro text={"Welcome"}/>
            </main>
        </>
    )
}
