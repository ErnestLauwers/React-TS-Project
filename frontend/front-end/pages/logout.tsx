import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {

    sessionStorage.clear();

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <main>
            </main>
        </>
    )
}

