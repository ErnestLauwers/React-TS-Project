import Head from 'next/head'
import Header from '../components/Header'

export default function Logout() {

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

