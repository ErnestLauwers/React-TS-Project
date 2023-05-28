import Header from "@/components/Header"
import Head from "next/head"
import { useRouter } from 'next/router'
import styles from '../../../styles/user/searchPosts.module.css'
import { Post } from "@/types"
import PostService from "@/services/PostService"
import PostTable from "@/components/post/PostTable"
import { useEffect, useState } from "react"

const Posts: React.FC = () => {

    const router = useRouter()
    const { id, username } = router.query

    const handleReturn = () => {
        router.push({
            pathname: '/users/search',
            query: { 
                currentUsername: username
            }
        })
    }

    const [posts, setPosts] = useState<Array<Post>>([])

    const getAllPosts = async () => {
        PostService.getAllPosts()
            .then((response) => response.json())
            .then((posts) => setPosts(posts.reverse()))
    }

    useEffect(() =>  {
        getAllPosts()
    }, [])

    const userPosts = posts.filter((post) => post.userId === Number(id))

    return (
        <>
        <Head>
            <title>User Posts</title>
        </Head>
        <Header/>
        <main>
            <p className={styles.header2}>Posts</p>
            <PostTable posts={userPosts} back="/users"/>
            <button className={styles.return} onClick={handleReturn}>Return</button>
        </main>
        </>
    )
}

export default Posts