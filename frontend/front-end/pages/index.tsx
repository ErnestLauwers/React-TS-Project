import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/register.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <main>
                <p className={styles.header}>
                    !!in init-db.ts staan er meerdere users!!
                </p>
                <p>Admin : username: ernestlauwers password: password</p>
                <p>Admin : username: igorstefanovic password: password</p>
                <p>User1 : username: davidwalker password: password</p>
                <p>User2 : username: lorrainemasson password: password</p>
                <p>User3 : username: jennifershelby password: password</p>
            </main>
        </>
    )
}