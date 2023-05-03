import Header from "@/components/Header"
import Intro from "@/components/Intro"
import UserService from "@/services/UserService"
import { User } from "@/types"
import Head from "next/head"
import { useState } from "react"
import { useRouter } from 'next/router'

const Profile: React.FC = () => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
                })
            }
        })
    }

    const handleClick = () => {
        sessionStorage.removeItem("username")
        router.push("/")
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header/>
            <main>
                <Intro text="Profile"/>
                <p>First name: {firstName}</p>
                <p>Last name: {lastName}</p>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Password: {password}</p>
                <button onClick={handleClick}>Logout </button>
            </main>
        </>
    )
}

export default Profile
