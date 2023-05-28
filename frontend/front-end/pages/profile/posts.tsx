import Head from "next/head"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { Post } from "@/types"
import { useRouter } from "next/router"
import ProfileHeader from "@/components/ProfileHeader"
import PostTable from "@/components/post/PostTable"
import PostService from "@/services/PostService"
import styles from '../../styles/createRecipe.module.css'
import Error from '../../components/Error'


const UserPosts: React.FC = () => {

    const router = useRouter()
    const { id } = router.query

    const [posts, setPosts] = useState<Array<Post>>([])
    const [error, setError] = useState<string>()

    const getAllPosts = async () => {
        const response = await PostService.getAllPosts();
        if (!response.ok) {
            if (response.status == 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        } else {
            setPosts(await response.json());
        }
    }

    useEffect(() =>  {
        getAllPosts()
    }, [])

    const UserPosts = posts.filter((post) => post.userId === Number(id))

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <Error error={error}/>
                ) :
                <><ProfileHeader id={Number(id)} /><PostTable posts={UserPosts} back="/profile" /></>
            }
            </main>
        </>
    )
}

export default UserPosts
