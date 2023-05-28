import Header from "@/components/Header"
import RecipeTable from "@/components/recipe/RecipeTable"
import RecipeService from "@/services/RecipeService"
import styles from "../..//styles/recipeTable.module.css"
import { Recipe } from "@/types"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Recipes: React.FC = () => {

    const router = useRouter()
    const [recipes, setRecipes] = useState<Array<Recipe>>([])
    const [error, setError] = useState<string>()

    const getAllRecipes = async () => {
        const response = await RecipeService.getAllRecipes();
        if (!response.ok) {
            if (response.status === 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        } else {
            setRecipes(await response.json());
        }
    }

    useEffect(() =>  {
        getAllRecipes()
    }, [])

    const handleCreateRecipe = () => {
        router.push('/recipes/add')
    }

    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <Header/>
            <main>
                {error ? (
                    <p className={styles.error}>An error ocurred: {error}</p>
                ) : 
                <><RecipeTable recipes={recipes} back="/recipes" /><button className={styles.addRecipe} onClick={handleCreateRecipe}>Create Recipe</button></>
                }
            </main>
        </>
    )
}

export default Recipes
