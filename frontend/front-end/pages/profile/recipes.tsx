import Head from "next/head"
import Header from "@/components/Header"
import RecipeTable from "@/components/recipe/RecipeTable"
import { useEffect, useState } from "react"
import { Recipe } from "@/types"
import RecipeService from "@/services/RecipeService"
import { useRouter } from "next/router"
import ProfileHeader from "@/components/ProfileHeader"
import styles from '../../styles/createRecipe.module.css'
import Error from '../../components/Error'

const UserRecipes: React.FC = () => {

    const router = useRouter()
    const { id } = router.query

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

    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <Error error={error}/>
                ) :
            <><ProfileHeader id={Number(id)} /><RecipeTable recipes={userRecipes} back="/profile" /></>
            }
            </main>
        </>
    )
}

export default UserRecipes
