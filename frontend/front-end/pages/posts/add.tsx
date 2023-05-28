import Header from "@/components/Header"
import Head from "next/head"
import PostAddForm from "@/components/post/PostAddForm"
import { useEffect, useState } from "react"
import UserService from "@/services/UserService"
import styles from "../../styles/post/postTable.module.css"

const AddPost: React.FC = () => {

    const [error, setError] = useState<string>() 

    const getUserLoggedIn = async () => {
        const response = await UserService.getUserwithUsername("");
        if (!response.ok) {
            if (response.status == 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        }
    }

    useEffect(() =>  {
        getUserLoggedIn()
    }, [])
    
    return (
        <>
            <Head>
                <title>Create Post</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <p className={styles.error}>An error ocurred: {error}</p>
                ) :
                <PostAddForm/>
            }
            </main>
        </>
    )
}

export default AddPost