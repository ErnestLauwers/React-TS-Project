import Head from 'next/head'
import Header from '../Header'
import UserService from '@/services/UserService'
import styles from '../../styles/user/search.module.css'
import { useState, FormEvent } from 'react'
import { User } from '../../types'
import { Error } from '../../types'
import { useRouter } from 'next/router'


const UserSearchForm: React.FC = () => {

    const router = useRouter()
    const { currentUsername } = router.query
    const currentUsernameParsed = currentUsername as string
    const userRole = typeof sessionStorage !== "undefined" && sessionStorage.getItem("userRole")

    const [username, setUsername] = useState<string>(currentUsernameParsed)
    const [user, setUser] = useState<User>()
    const [error, setError] = useState<Error>()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const response = await UserService.getUserwithUsername(username)
        const json = await response.json()
        if (response.status === 200) {
            setError(undefined)
            setUser(json)
        } 
        else {
            setError(json)
            setUser(undefined)
        }
    }

    const viewPosts = () => {
        router.push({
            pathname: '/users/search/posts',
            query: { 
                id: user?.id,
                username: username
            }
        })
    }

    const viewRecipes = () => {
        router.push({
            pathname: '/users/search/recipes',
            query: { 
                id: user?.id,
                username: username
            }
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
            <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label}>Which user do you want to look up?</label>
                        <input className={styles.input}
                            type="text"
                            value={username}
                            placeholder='Username...'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonDiv}>
                        <button className={styles.button}>Search</button>
                    </div>
                </form>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : user ? (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.th}>First Name</th>
                                <th className={styles.th}>Last Name</th>
                                <th className={styles.th}>Username</th>
                                <th className={styles.th}>Recipes</th>
                                <th className={styles.th}>Posts</th>
                                {userRole == "admin" ? (
                                    <th className={styles.th}>Delete</th>
                                ) : null}
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>{user.firstName}</td>
                                <td className={styles.td}>{user.lastName}</td>
                                <td className={styles.td}>{user.username}</td>
                                <td onClick={viewRecipes} className={styles.td}>{user.recipes.length}</td>
                                <td onClick={viewPosts} className={styles.td}>{user.posts.length}</td>
                                {userRole == "admin" ? (
                                    <td onClick={() => handleDelete(user.id)} className={styles.td}>Delete</td>
                                ): null}
                            </tr>
                        </tbody>
                    </table>
                ) : null}
        </>
    )
}

export default UserSearchForm