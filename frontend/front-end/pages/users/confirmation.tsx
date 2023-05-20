import Head from 'next/head'
import Header from '../../components/Header'
import UserDeleteTable from '@/components/user/UserDeleteTable'

const Confirmation: React.FC = () => {
    return (
        <>
            <Head>
                <title>Confirmation</title>
            </Head>
            <Header/>
            <main>
                <UserDeleteTable/>
            </main>
        </>
    )
}

export default Confirmation