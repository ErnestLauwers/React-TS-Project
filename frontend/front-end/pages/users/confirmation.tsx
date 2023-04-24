import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/confirmation.module.css'
import { useRouter } from "next/router"
import UserService from '@/services/UserService'

const Confirmation: React.FC = () => {

    const router = useRouter()
    const { user } = router.query
    const userParsed = JSON.parse(user as string) 
    const id = userParsed.id

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        UserService.deleteUser(id)
        router.push("/")
    }

    const cancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        router.push("/users")
    }

    return (
        <>
            <Head>
                <title>Confirmation</title>
            </Head>
            <Header/>
            <main>
                <h1 className={styles.h1}>Confirmation</h1>
                <hr className={styles.hr}/>
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
                                <td className={styles.td}>{userParsed.id}</td>
                                <td className={styles.td}>{userParsed.firstName}</td>
                                <td className={styles.td}>{userParsed.lastName}</td>
                                <td className={styles.td}>{userParsed.username}</td>
                                <td className={styles.td}>{userParsed.email}</td>
                            </tr>
                            </tbody>
                    </table>
                    <p className={styles.p}>Are you sure you want to delete your account?</p>
                    <div className={styles.rowButtons}>
                        <button onClick={handleDelete} className={styles.button}>Delete</button>
                        <button onClick={cancel} className={styles.button}>Cancel</button>
                    </div>
            </main>
        </>
    )
}

export default Confirmation