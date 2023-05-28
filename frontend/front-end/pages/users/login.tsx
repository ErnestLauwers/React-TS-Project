import Head from 'next/head'
import UserLoginForm from'@/components/user/UserLoginForm'
import styles from "../../styles/login.module.css"

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main>
                <UserLoginForm/>
                <section className={styles.login}>
                    <p>VOOR LECTOREN</p>
                    <p>Users om in te loggen -- staat in init-db.ts</p>
                    <p>Admin : username: ernestlauwers password: password</p>
                    <p>Admin : username: igorstefanovic password: password</p>
                    <p>User1 : username: davidwalker password: password</p>
                    <p>User2 : username: lorrainemasson password: password</p>
                    <p>User3 : username: jennifershelby password: password</p>
                </section>
            </main>
        </>
    )
}

export default Login