import Header from "@/components/Header"
import styles from '../../styles/login.module.css'
import Head from "next/head"
import { useState } from "react"
import { useRouter } from 'next/router'
import UserService from "@/services/UserService"
import { Error } from '../../types'

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<Error>()

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await UserService.loginUser(username, password);
        const json = await response.json()
        if (response.status === 200) {
            const { token } = json;
            sessionStorage.setItem("token", token);
            const userResponse = await UserService.getUserwithUsername(username);
            const { role } = await userResponse.json();
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userRole", role);
            router.push('/');   
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
            <Header/>
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