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

    const getAllRecipes = async () => {
        RecipeService.getAllRecipes()
            .then((response) => response.json())
            .then((recipes) => setRecipes(recipes.reverse()))
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
                <RecipeTable recipes={recipes} back="/recipes"/>
                <button className={styles.addRecipe} onClick={handleCreateRecipe}>Create Recipe</button>
            </main>
        </>
    )
}

export default Recipes
