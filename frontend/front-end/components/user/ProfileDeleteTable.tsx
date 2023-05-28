import styles from '../../styles/profile.module.css'
import { useRouter } from "next/router"
import UserService from "@/services/UserService"

const ProfileDeleteTable: React.FC = () => {

    const router = useRouter()
    const { user } = router.query
    const userParsed = JSON.parse(user as string) 
    const id = userParsed.id

    const handleDelete = () => {
        UserService.deleteUser(id)
        sessionStorage.clear();
        router.push("/")
    }

    const handleCancel = () => {
        router.push("/profile")
    }

    return (
        <>
            <p className={styles.header2}>Are you sure you want to permanently delete your account?</p>
                <table className={styles.table}>
                    <tr>
                        <td className={styles.td}>First Name</td>
                        <td className={styles.td}>{userParsed.firstName}</td>
                        <td className={styles.td}>Last Name</td>
                        <td className={styles.td}>{userParsed.lastName}</td>
                    </tr>
                    <tr>
                        <td className={styles.td2}>Username</td>
                        <td className={styles.td2} colSpan={3}>{userParsed.username}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>Recipes</td>
                        <td className={styles.td}>{userParsed?.recipes.length}</td>
                        <td className={styles.td}>Posts</td>
                        <td className={styles.td}>{userParsed?.posts.length}</td>
                    </tr>
                    <tr>
                        <td className={styles.td2}>Email</td>
                        <td className={styles.td2} colSpan={3}>{userParsed.email}</td>
                    </tr>
                    <tr>
                        <td className={styles.td2}>Password</td>
                        <td className={styles.td2} colSpan={3}>{userParsed.password}</td>
                    </tr>
                </table>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleCancel}>Cancel</button>
                    <button className={styles.button} onClick={handleDelete}>Delete</button>
                </div>
        </>
    )
}

export default ProfileDeleteTable
