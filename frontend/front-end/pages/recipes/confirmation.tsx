import Header from '@/components/Header'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../styles/post/confirmation.module.css'
import RecipeService from '@/services/RecipeService'


const Confirmation: React.FC = () => {

    const router = useRouter()
    const { recipe, username } = router.query
    const recipeParsed = JSON.parse(recipe as string)
    const id = recipeParsed.id

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        RecipeService.deleteRecipe(id)
        router.push("/recipes")
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push("/recipes")
    }

    return (
        <>
            <Head>
                <title>Confirmation</title>
            </Head>
            <Header/>
            <main>
                <p className={styles.p}>Are you sure you want to permanently delete this recipe?</p>
                <table className={styles.table}>
                    <tr>
                        <td colSpan={2} className={styles.title}>{recipeParsed.name}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={styles.text}>{recipeParsed.preparation}</td>
                    </tr>
                    
                    <tr>
                        <td colSpan={2} className={styles.text}>{recipeParsed.difficultyLevel}</td>
                    </tr>
                </table>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleDelete}>Delete</button>
                    <button className={styles.button} onClick={handleCancel}>Cancel</button>
                </div>
            </main>
        </>
    )
}

export default Confirmation
