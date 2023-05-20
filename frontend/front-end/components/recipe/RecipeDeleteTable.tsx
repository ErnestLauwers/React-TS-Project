import { useRouter } from 'next/router'
import styles from '../../styles/recipeTable.module.css'
import RecipeService from '@/services/RecipeService'

const RecipeDeleteTable: React.FC = () => {

    const router = useRouter()
    const { recipe, username, back} = router.query
    const recipeParsed = JSON.parse(recipe as string)
    const id = recipeParsed.id

    const handleDelete = () => {
        RecipeService.deleteRecipe(id)
        router.push(back as string)
    }

    const handleCancel = () => {
        router.push(back as string)
    }

    return (
        <>
            <p className={styles.p}>Are you sure you want to permanently delete this recipe?</p>
                <table className={styles.table}>
                    <tr className={styles.row}>
                        <td className={styles.name}>{recipeParsed.name}</td>
                        <td className={styles.username}>{username}</td>
                    </tr>
                    <tr className={styles.row}>
                        <td className={styles.field}>Genre: {recipeParsed.genre}</td>
                        <td className={styles.field}>Preperation Time: {Number(recipeParsed.preparationTime)} minutes</td>
                        <td className={styles.field}>Difficulty Level: {Number(recipeParsed.difficultyLevel)} / 10</td>
                    </tr>
                    <tr className={styles.row}>
                            {recipeParsed.ingredients.map((ingredient:{name:string, amountUsed:number}, index:number) => (
                                <td key={index} className={styles.ingredientBlock}>
                                    <span className={styles.bullet}></span>
                                    <td>{ingredient.name}:</td>
                                    <td className={styles.amount}>{ingredient.amountUsed}</td>
                                </td>
                            ))}
                        </tr>
                    <tr className={styles.row}>{recipeParsed.preparation}</tr>
                </table>
                <div className={styles.buttonsConf}>
                    <button className={styles.buttonConf} onClick={handleDelete}>Delete</button>
                    <button className={styles.buttonConf} onClick={handleCancel}>Cancel</button>
                </div>
        </>
    )
}

export default RecipeDeleteTable