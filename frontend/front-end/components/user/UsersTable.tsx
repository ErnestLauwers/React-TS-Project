import React from 'react'
import UserService from '@/services/UserService'
import styles from '../../styles/components/userTable.module.css'
import { User } from '../../types'
import { useRouter } from 'next/router';

type Props = {
    users: Array<User>
}

const UsersTable: React.FC<Props> = ({ users = [] }: Props) => {

    const router = useRouter();

    const handleUpdate = async (id:number) => {
        const response = await UserService.getUserwithId(id)
        const user = await response.json()
        router.push({
            pathname: '/users/edit',
            query: { user: JSON.stringify(user)}
        })
    }

    const handleDelete = async (id: number) => {
        const response = await UserService.getUserwithId(id)
        const user = await response.json()
        router.push({
            pathname: '/users/confirmation',
            query: { user: JSON.stringify(user)}
        })
    }

    return (
        <>
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
                    {users && users.map((user, index) => (
                        <tr key={index} className={styles.tr}>
                            <td className={styles.td}>{user.id}</td>
                            <td className={styles.td}>{user.firstName}</td>
                            <td className={styles.td}>{user.lastName}</td>
                            <td className={styles.td}>{user.username}</td>
                            <td className={styles.td}>{user.email}</td>
                            <td className={styles.td}><a className={styles.a} href="#" onClick={() => handleUpdate(user.id)}>Edit</a></td>
                            <td className={styles.td}><a className={styles.a} href="#" onClick={() => handleDelete(user.id)}>Delete</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UsersTable
