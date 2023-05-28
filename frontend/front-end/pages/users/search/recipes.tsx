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
            {error ? (
                    <p className={styles.error}>An error ocurred: {error}</p>
                ) : 
            <><p className={styles.header2}>Recipes</p><RecipeTable recipes={userRecipes} back="/users" /><button className={styles.return} onClick={handleReturn}>Return</button></>
            }
            </main>
        </>
    )
}

export default Recipes
