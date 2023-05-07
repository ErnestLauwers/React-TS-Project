import Head from 'next/head'
import LoginHeader from '@/components/LoginHeader'
import UserService from '@/services/UserService'
import styles from '../styles/register.module.css'
import { Error } from '../types'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Register: React.FC = () => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<Error>()

    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {firstName, lastName, username, email, password}
        const response = await UserService.addUser(user)
        const json = await response.json()
        if (response.status === 200) {
            setError(undefined)
            router.push("/")
        } 
        else {
            setError(json)
        }
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <LoginHeader/>
            <main>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : null
                }
                <p className={styles.header}>Register</p>
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
                            type="text"
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

export default Register
