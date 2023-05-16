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

    const handleDelete = async (id: number) => {
        const response = await UserService.getUserwithId(id)
        const user = await response.json()
        router.push({
            pathname: '/users/confirmation',
            query: { user: JSON.stringify(user)}
        })
    }

    const viewPosts = (user: User) => {
        router.push({
            pathname: '/users/posts',
            query: { 
                id: user?.id,
            }
        })
    }

    const viewRecipes = (user: User) => {
        router.push({
            pathname: '/users/recipes',
            query: { 
                id: user?.id,
            }
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
                            <th className={styles.th}>Recipes</th>
                            <th className={styles.th}>Posts</th>
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
                            <td onClick={() => viewRecipes(user)} className={styles.td}>{user.recipes.length}</td>
                            <td onClick={() => viewPosts(user)} className={styles.td}>{user.posts.length}</td>
                            <td onClick={() => handleDelete(user.id)} className={styles.td}>Delete</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UsersTable
