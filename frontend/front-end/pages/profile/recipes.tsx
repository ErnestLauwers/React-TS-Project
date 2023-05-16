import Head from "next/head"
import Header from "@/components/Header"
import RecipeTable from "@/components/recipe/RecipeTable"
import { useEffect, useState } from "react"
import { Recipe } from "@/types"
import RecipeService from "@/services/RecipeService"
import { useRouter } from "next/router"
import ProfileHeader from "@/components/ProfileHeader"
import styles from '../../styles/profile.module.css'


const UserRecipes: React.FC = () => {

    const router = useRouter()
    const { id } = router.query

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

    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <Header/>
            <main>
            <p className={styles.header2}>Recipes</p>
                <ProfileHeader id={Number(id)}/>
                <RecipeTable recipes={userRecipes} back="/profile"/>
            </main>
        </>
    )
}

export default UserRecipes
