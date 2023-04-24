import Head from 'next/head'
import Header from '../../components/Header'
import UsersOverview from '../../components/users/UserOverviewTable'
import UserService from '../../services/UserService'
import { useState, useEffect } from 'react'
import { User } from '../../types'

const Users: React.FC = () => {
    
    const [users, setUsers] = useState<Array<User>>([])

    const getAllUsers = async () => {
        UserService.getAllUsers()
            .then((res) => res.json())
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
                <UsersOverview users={users} />
            </main>
        </>
    )
}

export default Users