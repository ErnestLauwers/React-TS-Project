import UserService from '@/services/UserService'
import styles from '../../styles/user/confirmation.module.css'
import { useRouter } from 'next/router'
import { Error } from '../../types'
import { useState } from 'react'

const UserDeleteTable: React.FC = () => {

    const router = useRouter()
    const { user } = router.query
    const userParsed = JSON.parse(user as string) 
    const id = userParsed.id
    const [error, setError] = useState<Error>()

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const response = await UserService.deleteUser(id)
        const json = await response.json()
        if (response.status == 200) {
            router.push("/users")
        }
        else {
            setError(json);
        }
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push("/users")
    }

    return (
        <>
        {error ? (
                <p className={styles.error}>{error.errorMessage}</p>
            ) : null
            }
            <p className={styles.p}>Are you sure you want to delete this account?</p>
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
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        <tr className={styles.tr}>
                            <td className={styles.td}>{userParsed.id}</td>
                            <td className={styles.td}>{userParsed.firstName}</td>
                            <td className={styles.td}>{userParsed.lastName}</td>
                            <td className={styles.td}>{userParsed.username}</td>
                            <td className={styles.td}>{userParsed.email}</td>
                            <td className={styles.td}>{userParsed.recipes.length}</td>
                            <td className={styles.td}>{userParsed.posts.length}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.buttons}>
                    <button onClick={handleDelete} className={styles.button}>Delete</button>
                    <button onClick={handleCancel} className={styles.button}>Cancel</button>
                </div>
        </>
    )
}

export default UserDeleteTable