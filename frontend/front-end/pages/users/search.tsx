import Head from 'next/head'
import Header from '../../components/Header'
import UserService from '@/services/UserService'
import styles from '../../styles/user/search.module.css'
import Intro from '../../components/Intro'
import { useState, FormEvent } from 'react'
import { User } from '../../types'
import { Error } from '../../types'

const Search: React.FC = () => {

    const [username, setUsername] = useState<string>('')
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

    return (
        <>
            <Head>
                <title>Search User</title>
            </Head>
            <Header/>
            <main>
                <Intro text={"Search User"}/>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.label}>Which user do you want to look up?</label>
                        <input className={styles.input}
                            type="text"
                            value={username}
                            placeholder='Username...'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className={styles.button}>Search</button>
                    </div>
                </form>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : user ? (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Id</th>
                                <th className={styles.th}>First Name</th>
                                <th className={styles.th}>Last Name</th>
                                <th className={styles.th}>Username</th>
                                <th className={styles.th}>Email</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            <tr className={styles.tr}>
                                <td className={styles.td}>{user.id}</td>
                                <td className={styles.td}>{user.firstName}</td>
                                <td className={styles.td}>{user.lastName}</td>
                                <td className={styles.td}>{user.username}</td>
                                <td className={styles.td}>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : null}
            </main>
        </>
    )
}

export default Search
