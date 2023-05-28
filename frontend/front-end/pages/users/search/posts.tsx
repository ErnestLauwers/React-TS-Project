import Header from "@/components/Header"
import Head from "next/head"
import { useRouter } from 'next/router'
import styles from '../../../styles/user/searchPosts.module.css'
import { Post } from "@/types"
import PostService from "@/services/PostService"
import PostTable from "@/components/post/PostTable"
import { useEffect, useState } from "react"
import Error from '../../../components/Error'

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

    const userPosts = posts.filter((post) => post.userId === Number(id))

    return (
        <>
        <Head>
            <title>User Posts</title>
        </Head>
        <Header/>
        {error ? (
                    <Error error={error}/>
                ) :
            <PostTable posts={userPosts} back="/users/"/>
        }
        </>
    )
}

export default Posts