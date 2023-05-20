import Header from '@/components/Header'
import Head from 'next/head'
import PostDeleteTable from '@/components/post/PostDeleteTable'

const Confirmation: React.FC = () => {
    return (
        <>
            <Head>
                <title>Confirmation</title>
            </Head>
            <Header/>
            <main>
                <PostDeleteTable/>
            </main>
        </>
    )
}

export default Confirmation