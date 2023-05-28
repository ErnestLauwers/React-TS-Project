import Head from 'next/head'
import Header from '../components/Header'
import HomeComponent from '@/components/Home'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <HomeComponent/>
        </>
    )
}