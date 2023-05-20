import { useRouter } from 'next/router'
import styles from '../../styles/post/confirmation.module.css'
import PostService from '@/services/PostService'


const PostDeleteTable: React.FC = () => {

    const router = useRouter()
    const { post, username, back } = router.query
    const postParsed = JSON.parse(post as string)
    const id = postParsed.id

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        PostService.deletePost(id)
        router.push(back as string)
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push(back as string)
    }

    return (
        <>
            <p className={styles.p}>Are you sure you want to permanently delete this post?</p>
            <table className={styles.table}>
                <tr>
                    <td className={styles.td}>
                        <div className={styles.div}>{username}</div>
                        <div className={styles.div}>
                            <strong>
                                {new Date(postParsed.createdAt).toLocaleDateString()}{' '}
                                {new Date(postParsed.createdAt).toLocaleTimeString()}
                            </strong>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className={styles.title}>{postParsed.title}</td>
                </tr>
                <tr>
                    <td className={styles.text}>{postParsed.text}</td>
                </tr>
            </table>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleDelete}>Delete</button>
                <button className={styles.button} onClick={handleCancel}>Cancel</button>
            </div>
        </>
    )
}

export default PostDeleteTable