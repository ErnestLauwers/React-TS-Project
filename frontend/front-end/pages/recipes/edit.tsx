import Header from "@/components/Header"
import Head from "next/head"
import { useRouter } from 'next/router'
import { useState } from "react"
import styles from '../../styles/post/edit.module.css'
import RecipeService from "@/services/RecipeService"
import { Error } from '../../types'


const Edit: React.FC = () => {

    const router = useRouter()
    const { recipe } = router.query
    const recipeParsed = JSON.parse(recipe as string)
    const userId: number = recipeParsed.userId
    const recipeId: number = recipeParsed.id

    const [name, setName] = useState('')
    const [preparation, setPreparation] = useState('')
    const [preparationTime, setPreparationTime] = useState(0)
    const [difficultyLevel, setDifficultyLevel] = useState(0)
    const [genre, setGenre] = useState('')
    const [error, setError] = useState<Error>()


    const handleEdit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const recipe = {id:recipeId, name, preparation, preparationTime, difficultyLevel, genre, userId}
        const response = await RecipeService.updateRecipe(recipe)
        const json = await response.json()
        if (response.status === 200) {
            setError(undefined)
            router.push("/recipes")
        } else {
            setError(json)
        }
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        router.push("/recipes")
    }

    return (
        <>
            <Head>
                <title>Edit Recipe</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <p className={styles.error}>{error.errorMessage}</p>
                ) : null
                }
                <p className={styles.header}>Edit Recipe</p>
                <form className={styles.form}>
                    <div className={styles.row1}>
                        <label className={styles.label}>Name</label>
                        <input className={styles.input} 
                            type="text"
                            placeholder='Name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.row2}>
                        <label className={styles.label}>Preparation</label>
                        <textarea placeholder="Preparation Instructions" className={styles.textarea} cols={100} rows={10} value={preparation} onChange={(e) => setPreparation(e.target.value)}></textarea>
                    </div>
                    <div className={styles.row1}>
                        <label className={styles.label}>Preparation Time (in Hours)</label>
                        <input className={styles.input} 
                            type="number"
                            placeholder='Preparation Time in hours...'
                            value={preparationTime}
                            onChange={(e) => setPreparationTime(Number(e.target.value))}
                            min="1"
                            max="5"
                        />
                    </div>
                    <div className={styles.row1}>
                        <label className={styles.label}>Difficulty Level</label>
                        <input className={styles.input} 
                            type="number"
                            placeholder='Difficulty Level...'
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                            min="1"
                            max="10"
                        />
                    </div>
                    <div className={styles.row1}>
                        <label className={styles.label}>Genre</label>
                        <input className={styles.input} 
                            type="text"
                            placeholder='Genre...'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={handleEdit}>Edit</button>
                        <button className={styles.button} onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Edit