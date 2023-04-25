import Head from "next/head"
import { useRouter } from "next/router"
import Header from '../../components/Header'
import { useState, FormEvent } from 'react'
import UserService from '@/services/UserService'
import { User } from '../../types'
import styles from '../../styles/updateUser.module.css';
import { Error } from '../../types'

const Update: React.FC = () => {

    const router = useRouter()
    const { user } = router.query
    const userParsed = JSON.parse(user as string)

    const id = userParsed.id
    const [firstName, setFirstName] = useState(userParsed.firstName)
    const [lastName, setLastName] = useState(userParsed.lastName)
    const [username, setUsername] = useState(userParsed.username)
    const [email, setEmail] = useState(userParsed.email)
    const [password, setPassword] = useState(userParsed.password)
    const [error, setError] = useState<Error>()

    const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const user = {id, firstName, lastName, username, email, password}
        const res = await UserService.updateUser(user)
        const json = await res.json()
        if (res.status === 200) {
            setError(undefined)
            router.push("/users")
        } else {
            setError(json)
        }
    }

    const cancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        router.push("/users")
    }

    return (
        <>
            <Head>
                <title>Edit User</title>
            </Head>
            <Header/>
            <main>
                <h1 className={styles.h1}>Edit User</h1>
                <hr className={styles.hr}/>
                {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : 
                <p></p>
                }
                <form className={styles.form}>
                    <div className={styles.row}>
                        <label className={styles.label}>First Name</label>
                        <input className={styles.input} 
                            type="text"
                            required
                            placeholder='First Name...'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Last Name</label>
                        <input className={styles.input}
                            type="text"
                            required 
                            placeholder='Last Name...'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Username</label>
                        <input className={styles.input}
                            type="text"
                            required 
                            placeholder='Username...'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Email</label>
                        <input className={styles.input}
                            type="email"
                            required 
                            placeholder='Email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div >
                        <div className={styles.row}>
                        <label className={styles.label}>Password</label>
                        <input className={styles.input}
                            type="password"
                            required 
                            placeholder='Password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.rowButtons}>
                        <button onClick={handleUpdate} className={styles.button}>Edit</button>
                        <button onClick={cancel} className={styles.button}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Update