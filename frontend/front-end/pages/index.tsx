import LoginHeader from "@/components/LoginHeader"
import styles from '../styles/login.module.css'
import Head from "next/head"
import { useState } from "react"
import { useRouter } from 'next/router'
import UserService from "@/services/UserService"
import { Error } from '../types'

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<Error>()

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await UserService.validateUser(username, password)
        const json = await response.json()
        console.log(json)
        if (response.status === 200) {
            sessionStorage.setItem("username", username)
            router.push("/home")
        }
        else {
            setError(json)
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <LoginHeader/>
            <main>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : null
                }
                <p className={styles.header}>Login</p>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                        <label className={styles.label}>Password</label>
                        <input className={styles.input}
                            type="password"
                            placeholder='Password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <button className={styles.button}>Login</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Login
