import Head from 'next/head'
import Header from '../../components/Header'
import { useState, FormEvent } from 'react'
import UserService from '@/services/UserService'
import { User } from '../../types'
import styles from '../../styles/search.module.css'

const Search: React.FC = () => {

    const [username, setUsername] = useState('')
    const [user, setUser] = useState<User | null>(null)

    const getUser = async (event: FormEvent) => {
        event.preventDefault();
        const res = await UserService.getUserwithUsername(username)
        const json = await res.json()
        setUser(json)
    }

    return (
        <>
            <Head>
                <title>Search User</title>
            </Head>
            <Header/>
            <main>
                <h1 className={styles.h1}>Search User</h1>
                <hr className={styles.hr}/>
                    <form className={styles.form} onSubmit={getUser}>
                        <div>
                            <label className={styles.label}>Which user do you want to look up?</label>
                            <input className={styles.input}
                                type="text" 
                                required
                                value={username}
                                placeholder='Username...'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className={styles.button}>Search</button>
                        </div>
                    </form>
                        {user && (
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
                        )}
            </main>
        </>
    )
}

export default Search
