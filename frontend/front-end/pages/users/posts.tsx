import Head from "next/head"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { Post } from "@/types"
import { useRouter } from "next/router"
import PostTable from "@/components/post/PostTable"
import PostService from "@/services/PostService"
import styles from '../../styles/profile.module.css'

const PostsUser: React.FC = () => {

    const router = useRouter()
    const { id } = router.query

    const [posts, setPosts] = useState<Array<Post>>([])

    const getAllPosts = async () => {
        PostService.getAllPosts()
            .then((response) => response.json())
            .then((posts) => setPosts(posts.reverse()))
    }

    useEffect(() =>  {
        getAllPosts()
    }, [])

    const UserPosts = posts.filter((post) => post.userId === Number(id))

    const handleReturn = () => {
        router.push({
            pathname: '/users',
        })
    }

    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <Header/>
            <main>
                <p className={styles.header2}>Posts</p>
                <PostTable posts={UserPosts} back="/users"/>
                <button className={styles.return} onClick={handleReturn}>Return</button>
            </main>
        </>
    )
}

export default PostsUser