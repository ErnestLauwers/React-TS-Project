import Head from 'next/head'
import Header from '../../../components/Header'
import UserSearchForm from '../../../components/user/UserSearchForm'
import { useEffect, useState } from 'react'
import UserService from '@/services/UserService'
import styles from "../../../styles/createRecipe.module.css"
import Error from '../../../components/Error'

const Search: React.FC = () => {

    const [error, setError] = useState<string>() 

    const getUserLoggedIn = async () => {
        const response = await UserService.getAllUsers();
        if (!response.ok) {
            if (response.status == 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        }
    }

    useEffect(() =>  {
        getUserLoggedIn()
    }, [])
    
    return (
        <>
            <Head>
                <title>Search User</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <Error error={error}/>
                ) :
                <UserSearchForm/>
            }  
            </main>
        </>
    )
}

export default Search