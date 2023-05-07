import Header from "@/components/Header"
import Head from "next/head"
import { useRouter } from 'next/router'
import styles from '../../../styles/user/searchPosts.module.css'
import { Post } from "@/types"
import PostService from "@/services/PostService"


const Posts: React.FC = () => {

    const router = useRouter()
    const { user, username } = router.query
    const userParsed = JSON.parse(user as string)

    const handleReturn = () => {
        router.push({
            pathname: '/users/search',
            query: { 
                currentUsername: username
            }
        })
    }

    const handleDelete = async (id: number) => {
        const response = await PostService.getPost(id)
        const post = await response.json()
        router.push({
            pathname: '/posts/confirmation',
            query: { 
                post: JSON.stringify(post),
                username: username
            }
        })
    }

    const loggedInUser = sessionStorage.getItem("username")


    return (
        <>
        <Head>
            <title>User Posts</title>
        </Head>
        <Header/>
        <main>
            {userParsed.posts.map((post : Post) => (
                <table className={styles.table}>
                    <tr>
                        <td className={styles.td}>
                            {username}
                        </td>
                        <td className={styles.td}>
                            {new Date(post.createdAt).toLocaleDateString()}{' '}
                            {new Date(post.createdAt).toLocaleTimeString()}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={styles.title}>{post.title}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={styles.text}>{post.text}</td>
                    </tr> 
                    {loggedInUser == "admin" ? (
                    <tr>
                        <td colSpan={2} className={styles.button1} onClick={() => handleDelete(post.id)}>Delete</td>
                    </tr>
                    ) : null}
                </table>
            ))}
            <button className={styles.add} onClick={handleReturn}>Return</button>
        </main>
        </>
    )
}

export default Posts