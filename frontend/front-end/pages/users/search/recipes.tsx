import Header from "@/components/Header"
import Head from "next/head"
import { useRouter } from 'next/router'
import styles from '../../../styles/recipeTable.module.css'
import { Ingredient, Recipe } from "@/types"
import { useEffect, useState } from "react"
import RecipeService from "@/services/RecipeService"
import RecipeTable from "@/components/recipe/RecipeTable"

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
            <p className={styles.header2}>Recipes</p>
                <RecipeTable recipes={userRecipes} back="/users"/>
                <button className={styles.return} onClick={handleReturn}>Return</button>
            </main>
        </>
    )
}

export default Recipes
