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

    const getAllPosts = async () => {
        PostService.getAllPosts()
            .then((response) => response.json())
            .then((posts) => setPosts(posts.reverse()))
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
                <PostTable posts={posts} back="/posts"/>
                <button className={styles.add} onClick={handleCreatePost}>Create Post</button>
            </main>
        </>
    )
}

export default Posts
