import React from 'react'
import { User } from '../../types'
import UserService from '@/services/UserService'
import { useRouter } from 'next/router';
import styles from '../../styles/userOverview.module.css'

type Props = {
    users: Array<User>
}

const UserOverviewTable: React.FC<Props> = ({ users = [] }: Props) => {

    const router = useRouter();

    const deleteUser = async (id: number) => {
        const res = await UserService.getUserwithId(id)
        const user = await res.json()
        router.push({
            pathname: '/users/confirmation',
            query: { user: JSON.stringify(user)}
        })
    }

    const updateUser = async (id:number) => {
        const res = await UserService.getUserwithId(id)
        const user = await res.json()
        router.push({
            pathname: '/users/update',
            query: { user: JSON.stringify(user)}
        })
    }

    return (
        <>
        <h1 className={styles.h1}>User Overview</h1>
        <hr className={styles.hr} />
            {users && (
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Id</th>
                            <th className={styles.th}>First Name</th>
                            <th className={styles.th}>Last Name</th>
                            <th className={styles.th}>Username</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Edit</th>
                            <th className={styles.th}>Delete</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {users && 
                        users.map((user, index) => (
                            <tr key={index} className={styles.tr}>
                                <td className={styles.td}>{user.id}</td>
                                <td className={styles.td}>{user.firstName}</td>
                                <td className={styles.td}>{user.lastName}</td>
                                <td className={styles.td}>{user.username}</td>
                                <td className={styles.td}>{user.email}</td>
                                <td className={styles.td}><a className={styles.a} href="#" onClick={() => updateUser(user.id)}>Edit</a></td>
                                <td className={styles.td}><a className={styles.a} href="#" onClick={() => deleteUser(user.id)}>Delete</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UserOverviewTable