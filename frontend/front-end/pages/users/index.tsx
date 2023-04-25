import Head from 'next/head'
import Header from '../../components/Header'
import UserService from '../../services/UserService'
import UsersTable from '../../components/user/UsersTable'
import Intro from '../../components/Intro'
import { User } from '../../types'
import { useState, useEffect } from 'react'

const Users: React.FC = () => {
    
    const [users, setUsers] = useState<Array<User>>([])

    const getAllUsers = async () => {
        UserService.getAllUsers()
            .then((response) => response.json())
            .then((users) => setUsers(users))
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
                <Intro text={"Users"}/>
                <UsersTable users={users} />
            </main>
        </>
    )
}

export default Users
