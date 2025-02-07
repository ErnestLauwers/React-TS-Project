import Head from 'next/head'
import UserLoginForm from'@/components/user/UserLoginForm'

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main>
                <UserLoginForm/>
            </main>
        </>
    )
}

export default Login