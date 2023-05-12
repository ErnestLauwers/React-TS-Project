import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Post } from '@/types';
import styles from "../../styles/post/postTable.module.css"
import UserService from '@/services/UserService';
import PostService from '@/services/PostService';


type Props = {
    posts: Array<Post>
}

const PostTable: React.FC<Props> = ({ posts = [] }: Props) => {

    const router = useRouter();

    const [users, setUsers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        async function fetchUsers() {
            const newUsers: { [key: number]: string } = {};
            for (const post of posts) {
                if (post.userId && !users[post.userId]) {
                    const response = await UserService.getUserwithId(post.userId);
                    const user = await response.json()
                    newUsers[post.userId] = user.username;
                }
            }
            setUsers({ ...users, ...newUsers });
        }
        fetchUsers();
    }, [posts]);

    const handleEdit = async (id: number) => {
        const response = await PostService.getPost(id)
        const post = await response.json()
        router.push({
            pathname: '/posts/edit',
            query: { 
                post: JSON.stringify(post),
            }
        })
    }

    const handleDelete = async (id: number) => {
        const response = await PostService.getPost(id)
        const post = await response.json()
        const username = users[post.userId]
        router.push({
            pathname: '/posts/confirmation',
            query: { 
                post: JSON.stringify(post),
                username: username
            }
        })
    }

    const loggedInUser = sessionStorage.getItem("username")

    const handleCreatePost = () => {
        router.push('/posts/add')
    }

    return (
        <>
            {posts && posts.map((post) => (
                <table className={styles.table}>
                    <tr>
                        <td className={styles.td}>
                            {users[post.userId]}
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
                    ): users[post.userId] === loggedInUser ? (
                    <tr>
                        <td className={styles.button} onClick={() => handleEdit(post.id)}>Edit</td>
                        <td className={styles.button} onClick={() => handleDelete(post.id)}>Delete</td>
                    </tr>
                    ) : null}
                </table>
            ))}
            <button className={styles.add} onClick={handleCreatePost}>Create Post</button>
        </>
    )
}

export default PostTable
