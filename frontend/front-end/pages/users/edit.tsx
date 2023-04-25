import Head from 'next/head'
import Header from '../../components/Header'
import UserService from '@/services/UserService'
import styles from '../../styles/user/edit.module.css'
import Intro from '../../components/Intro'
import { Error } from '../../types'
import { useState } from 'react'
import { useRouter } from "next/router"

const Edit: React.FC = () => {

    const router = useRouter()
    const { user } = router.query
    const userParsed = JSON.parse(user as string)
    const id = userParsed.id

    const [firstName, setFirstName] = useState<string>(userParsed.firstName)
    const [lastName, setLastName] = useState<string>(userParsed.lastName)
    const [username, setUsername] = useState<string>(userParsed.username)
    const [email, setEmail] = useState<string>(userParsed.email)
    const [password, setPassword] = useState<string>(userParsed.password)
    const [error, setError] = useState<Error>()

    const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const user = {id, firstName, lastName, username, email, password}
        const response = await UserService.updateUser(user)
        const json = await response.json()
        if (response.status === 200) {
            setError(undefined)
            router.push("/users")
        } else {
            setError(json)
        }
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push("/users")
    }

    return (
        <>
            <Head>
                <title>Edit User</title>
            </Head>
            <Header/>
            <main>
                <Intro text={"Edit User"}/>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : null
                }
                <form className={styles.form}>
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
                    <div className={styles.buttons}>
                        <button onClick={handleUpdate} className={styles.button}>Edit</button>
                        <button onClick={handleCancel} className={styles.button}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Edit
