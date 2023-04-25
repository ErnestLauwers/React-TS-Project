import Head from 'next/head'
import Header from '../../components/Header'
import { useState } from 'react'
import UserService from '@/services/UserService'
import { useRouter } from 'next/router';
import styles from '../../styles/addUser.module.css'
import { Error } from '../../types'


const AddUser: React.FC = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<Error>()
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {firstName, lastName, username, email, password}
        const res = await UserService.addUser(user)
        const json = await res.json()
        if (res.status === 200) {
            setError(undefined)
            router.push("/users")
        } else {
            setError(json)
        }
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <Header/>
            <main>
                <h1 className={styles.h1}>Register</h1>
                <hr className={styles.hr}/>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : 
                <p></p>
                }
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label className={styles.label}>First Name</label>
                        <input className={styles.input} 
                            type="text"
                            placeholder='First Name...'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Last Name</label>
                        <input className={styles.input}
                            type="text"
                            placeholder='Last Name...'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Username</label>
                        <input className={styles.input}
                            type="text"
                            placeholder='Username...'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Email</label>
                        <input className={styles.input}
                            type="email"
                            placeholder='Email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div >
                        <div className={styles.row}>
                        <label className={styles.label}>Password</label>
                        <input className={styles.input}
                            type="password"
                            placeholder='Password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <button className={styles.button}>Register</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default AddUser