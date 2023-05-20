import styles from '../../styles/profile.module.css'
import { useEffect, useState } from "react"
import UserService from "@/services/UserService"
import { Post, Recipe, User } from "@/types"
import { useRouter } from "next/router"

const UserProfileTable: React.FC =  () => {

    const router = useRouter();
    const username = sessionStorage.getItem("username");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
        const response = await UserService.getUserwithUsername(username as string);
        const user = await response.json();
        setUser(user);
        };

        fetchData();
    }, [username]);

    const handleEdit = async (id: number) => {
        const response = await UserService.getUserwithId(id);
        const user = await response.json();
        router.push({
            pathname: '/users/edit',
            query: {
                user: JSON.stringify(user),
            }
        })
    }

    const handleDelete = async (id: number) => {
        const response = await UserService.getUserwithId(id);
        const user = await response.json();
        router.push({
            pathname: '/profile/confirmation',
            query: {
                user: JSON.stringify(user),
            }
        })
    }

    return (
        <>
            <p className={styles.header2}>Personal Information</p>
                <table className={styles.table}>
                    <tr>
                        <td className={styles.td}>First Name</td>
                        <td className={styles.td}>{user?.firstName}</td>
                        <td className={styles.td}>Last Name</td>
                        <td className={styles.td}>{user?.lastName}</td>
                    </tr>
                    <tr>
                        <td className={styles.td2}>Username</td>
                        <td className={styles.td2} colSpan={3}>{username}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>Recipes</td>
                        <td className={styles.td}>{user?.recipes.length}</td>
                        <td className={styles.td}>Posts</td>
                        <td className={styles.td}>{user?.posts.length}</td>
                    </tr>
                    <tr>
                        <td className={styles.td2}>Email</td>
                        <td className={styles.td2} colSpan={3}>{user?.email}</td>
                    </tr>
                    <tr>
                        <td className={styles.td2}>Password</td>
                        <td className={styles.td2} colSpan={3}>{user?.password}</td>
                    </tr>
                    <tr>
                        <td className={styles.td3} colSpan={2} onClick={() => handleEdit(user?.id as number)}>Edit</td>
                        <td className={styles.td3} colSpan={2} onClick={() => handleDelete(user?.id as number)}>Delete</td>
                    </tr>
                </table>
        </>
    )
}

export default UserProfileTable