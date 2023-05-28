import Head from "next/head"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import UserService from "@/services/UserService"
import { User } from "@/types"
import ProfileHeader from "@/components/ProfileHeader"
import UserProfileTable from "@/components/user/UserProfileTable"
import styles from "../../styles/post/postTable.module.css"

const Profile: React.FC =  () => {

    const username = typeof sessionStorage !== "undefined" && sessionStorage.getItem("username");
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();

    const getUserProfile = async () => {
        const response = await UserService.getUserwithUsername(username as string);
        if (!response.ok) {
            if (response.status == 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        } else {
            setUser(await response.json());
        }
    };

    useEffect(() =>  {
        getUserProfile()
    }, [])

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <p className={styles.error}>An error ocurred: {error}</p>
                ) :
                <><ProfileHeader id={user?.id as number} /><UserProfileTable /></>
            }
            </main>
        </>
    )
}

export default Profile