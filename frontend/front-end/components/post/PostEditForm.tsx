import { useRouter } from 'next/router'
import { useState } from "react"
import styles from '../../styles/post/edit.module.css'
import PostService from "@/services/PostService"
import { Error } from '../../types'


const PostEditForm: React.FC = () => {

    const router = useRouter()
    const { post, back } = router.query
    const postParsed = JSON.parse(post as string)
    const userId: number = postParsed.userId
    const postId: number = postParsed.id

    const [title, setTitle] = useState<string>(postParsed.title)
    const [text, setText] = useState<string>(postParsed.text)
    const [error, setError] = useState<Error>()

    const handleEdit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const post = {id:postId, title, text, userId}
        const response = await PostService.updatePost(post)
        const json = await response.json()
        if (response.status === 200) {
            setError(undefined)
            router.push(back as string)
        } else {
            setError(json)
        }
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push(back as string)
    }

    return (
        <>
            {error ? (
                <p className={styles.error}>{error.errorMessage}</p>
            ) : null
            }
            <p className={styles.header}>Edit Post</p>
            <form className={styles.form}>
                <div className={styles.row1}>
                    <label className={styles.label}>Title</label>
                    <input className={styles.input} 
                        type="text"
                        placeholder='Title...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.row2}>
                    <label className={styles.label}>Content</label>
                    <textarea placeholder="What's on your mind?" className={styles.textarea} cols={100} rows={10} value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleEdit}>Edit</button>
                    <button className={styles.button} onClick={handleCancel} >Cancel</button>
                </div>
            </form>
        </>
    )
}

export default PostEditForm