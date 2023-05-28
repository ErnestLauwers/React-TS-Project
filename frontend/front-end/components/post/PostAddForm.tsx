import styles from "../../styles/post/add.module.css"
import { use, useState } from "react"
import UserService from "@/services/UserService"
import PostService from "@/services/PostService"
import { useRouter } from 'next/router'
import { Error } from '../../types'

const PostAddForm: React.FC = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(-1)
    const [error, setError] = useState<Error>()

    const router = useRouter()
    
    const username = typeof sessionStorage !== "undefined" && sessionStorage.getItem("username")
    if (username) {
        UserService.getUserwithUsername(username).then(response => {
            if (response.ok) {
                response.json().then(user =>  {
                    setUserId(user.id)
                })
            }
        })
    }

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const post = {title, text, userId}
        const response = await PostService.addPost(post)
        const json = await response.json()
        if (response.status === 200) {
            router.push('/posts')
        }
        else {
            setError(json)
        }
    }

    const cancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push('/posts')
    }

    return (
        <>
            {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : null
                }
            <p className={styles.header}>Create Post</p>
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
                        <button className={styles.button} onClick={handleSubmit}>Post</button>
                        <button className={styles.button} onClick={cancel}>Cancel</button>
                    </div>
                </form>
        </>
    )
}

export default PostAddForm