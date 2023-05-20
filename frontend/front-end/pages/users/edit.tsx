import Head from 'next/head'
import Header from '../../components/Header'
import UserEditForm from '@/components/user/UserEditForm'

const Edit: React.FC = () => {
    return (
        <>
            <Head>
                <title>Edit User</title>
            </Head>
            <Header/>
            <main>
                <UserEditForm/>
            </main>
        </>
    )
}

export default Edit