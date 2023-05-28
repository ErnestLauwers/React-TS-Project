import Head from 'next/head'
import Header from '../../components/Header'
import UserService from '../../services/UserService'
import UsersTable from '../../components/user/UsersTable'
import styles from "../../styles/createRecipe.module.css"
import { User } from '../../types'
import { useState, useEffect } from 'react'
import Error from '../../components/Error'

const Users: React.FC = () => {
    
    const [users, setUsers] = useState<Array<User>>([])
    const [error, setError] = useState<string>()

    const getAllUsers = async () => {
        const response = await UserService.getAllUsers();
        if (!response.ok) {
            if (response.status === 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        } else {
            setUsers(await response.json());
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header/>
            <main>
                {error ? (
                    <Error error={error}/>
                ) : 
                <UsersTable users={users} />
                }       
            </main>
        </>
    )
}

export default Users
