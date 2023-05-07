import Header from "@/components/Header"
import PostTable from "@/components/PostTable"
import PostService from "@/services/PostService"
import { Post } from "@/types"
import Head from "next/head"
import { useEffect, useState } from "react"

const Posts: React.FC = () => {

    const [posts, setPosts] = useState<Array<Post>>([])

    const getAllPosts = async () => {
        PostService.getAllPosts()
            .then((response) => response.json())
            .then((posts) => setPosts(posts.reverse()))
    }

    useEffect(() =>  {
        getAllPosts()
    }, [])

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <Header/>
            <main>
                <PostTable posts={posts}/>
            </main>
        </>
    )
}

export default Posts
