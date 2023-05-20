import Head from "next/head"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import UserService from "@/services/UserService"
import { User } from "@/types"
import ProfileHeader from "@/components/ProfileHeader"
import UserProfileTable from "@/components/user/UserProfileTable"

const Profile: React.FC =  () => {

    const username = sessionStorage.getItem("username");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
        const response = await UserService.getUserwithUsername(username as string);
        const user = await response.json();
        setUser(user);
        };

        fetchData();
    }, [username]);

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header/>
            <main>
                <ProfileHeader id={user?.id as number}/>
                <UserProfileTable/>
            </main>
        </>
    )
}

export default Profile