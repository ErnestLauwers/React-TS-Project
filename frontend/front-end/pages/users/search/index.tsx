import Head from 'next/head'
import Header from '../../../components/Header'
import UserSearchForm from '../../../components/user/UserSearchForm'


const Search: React.FC = () => {
    return (
        <>
            <Head>
                <title>Search User</title>
            </Head>
            <Header/>
            <main>
                <UserSearchForm/>
            </main>
        </>
    )
}

export default Search