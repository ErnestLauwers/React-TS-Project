import Header from "@/components/Header"
import PostTable from "@/components/post/PostTable"
import PostService from "@/services/PostService"
import styles from "../../styles/post/postTable.module.css"
import { Post } from "@/types"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Posts: React.FC = () => {

    const router = useRouter();

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

    const handleCreatePost = () => {
        router.push('/posts/add')
    }

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <Header/>
            <main>
                {error ? (
                    <p className={styles.error}>An error ocurred: {error}</p>
                ) :
                <><PostTable posts={posts} back="/posts" /><button className={styles.add} onClick={handleCreatePost}>Create Post</button></>
                }
            </main>
        </>
    )
}

export default Posts
