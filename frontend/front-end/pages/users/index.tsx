import Head from 'next/head'
import Header from '../../components/Header'
import UsersOverview from '../../components/users/UserOverviewTable'
import UserService from '../../services/UserService'
import { useState, useEffect } from 'react'
import { User } from '../../types'

const Users: React.FC = () => {
    
    const [users, setUsers] = useState<Array<User>>([])

    const getUsers = async () => {
        console.log("index-getUsers")
        UserService.getAllUsers()
            .then((res) => res.json())
            .then((users) => setUsers(users))
    }

    useEffect(() => {
        console.log("index-useEffect")
        getUsers()
    }, [])

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header></Header>
            <main>
                <section className='row justify-content-center'>
                    <UsersOverview users={users} />
                </section>
            </main>
        </>
    )
}

export default Users