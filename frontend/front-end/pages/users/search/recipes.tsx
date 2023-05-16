import Header from "@/components/Header"
import Head from "next/head"
import { useRouter } from 'next/router'
import styles from '../../../styles/recipeTable.module.css'
import { Ingredient, Recipe } from "@/types"
import { useEffect, useState } from "react"
import RecipeService from "@/services/RecipeService"

const Recipes: React.FC = () => {
    
    const router = useRouter()
    const { id, username } = router.query

    const [recipes, setRecipes] = useState<Array<Recipe>>([])

    const getAllRecipes = async () => {
        RecipeService.getAllRecipes()
            .then((response) => response.json())
            .then((recipes) => setRecipes(recipes.reverse()))
    }

    useEffect(() =>  {
        getAllRecipes()
    }, [])

    const userRecipes = recipes.filter((recipe) => recipe.userId === Number(id))

    const handleReturn = () => {
        router.push({
            pathname: '/users/search',
            query: { 
                currentUsername: username
            }
        })
    }

    return (
        <>
            <Head>
                <title>User Recipes</title>
            </Head>
            <Header/>
            <main>
                {userRecipes.length > 0 ? (
                    userRecipes.map((recipe, index) => (
                        <table key={index} className={styles.table}>
                            <tr className={styles.row}>
                                <td className={styles.name}>{recipe.name}</td>
                                <td className={styles.username}>{username}</td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={styles.field}>Genre: {recipe.genre}</td>
                                <td className={styles.field}>Preparation Time: {Number(recipe.preparationTime)} minutes</td>
                                <td className={styles.field}>Difficulty Level: {Number(recipe.difficultyLevel)} / 10</td>
                            </tr>
                            <tr className={styles.row}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <td key={index} className={styles.ingredientBlock}>
                                    <span className={styles.bullet}></span>
                                    <td>{ingredient.name}:</td>
                                    <td className={styles.amount}>{ingredient.amountUsed}</td>
                                </td>
                            ))}
                            </tr>
                            <tr className={styles.row}>
                                <td>{recipe.preparation}</td>
                            </tr>
                        </table>
                    ))
                ) : (
                    <p className={styles.error}>This user has not made any recipes yet!</p>
                )}
                <button className={styles.return} onClick={handleReturn}>Return</button>
            </main>
        </>
    )
}

export default Recipes
