import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/profile.module.css'

type Props = {
    id: number
}

const ProfileHeader: React.FC<Props> = ({id}: Props) => {
    
    const router = useRouter()

    const viewRecipes = () => {
        router.push({
            pathname: '/profile/recipes',
            query: { 
                id: id
            }
        })
    }

    const viewPosts = () => {
        router.push({
            pathname: '/profile/posts',
            query: { 
                id: id
            }
        })
    }

    const information = () => {
        router.push('/profile')
    }

    const logout = () => {
        sessionStorage.clear();
        router.push('/')
    }

    return (
        <>
            <p className={styles.header}>Settings</p>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li} onClick={information}>Personal Information</li>
                    <li className={styles.li} onClick={viewRecipes}>Recipes</li>
                    <li className={styles.li} onClick={viewPosts}>Posts</li>
                    <li className={styles.li} onClick={logout}>Logout</li>
                </ul>
            </nav>
        </>
    )
}

export default ProfileHeader