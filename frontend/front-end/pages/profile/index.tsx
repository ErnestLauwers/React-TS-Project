import Header from "@/components/Header"
import UserService from "@/services/UserService"
import Head from "next/head"
import { useState } from "react"
import { useRouter } from 'next/router'

const Profile: React.FC = () => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [id, setId] = useState<number>(0)

    const router = useRouter()

    const storage = sessionStorage.getItem("username")
    if (storage) {
        UserService.getUserwithUsername(storage).then(response => {
            if (response.ok) {
                response.json().then(user => {
                    setFirstName(user.firstName)
                    setFirstName(user.firstName)
                    setLastName(user.lastName)
                    setUsername(user.username)
                    setEmail(user.email)
                    setPassword(user.password)
                    setId(user.id)
                })
            }
        })
    }

    const handleLogout = () => {
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("userRole")
        router.push("/")
    }

    const handleEdit = async () => {
        const response = await UserService.getUserwithId(id);
        const user = await response.json();
        router.push({
            pathname: '/users/edit',
            query: {
                user: JSON.stringify(user),
            }
        })
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header/>
            <main>
                <p>First name: {firstName}</p>
                <p>Last name: {lastName}</p>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Password: {password}</p>
                <button onClick={handleLogout}>Logout </button>
                <button onClick={handleEdit}>Edit account information</button>
            </main>
        </>
    )
}

export default Profile
