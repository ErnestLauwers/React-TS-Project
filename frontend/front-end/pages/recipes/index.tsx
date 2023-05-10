import Header from "@/components/Header"
import RecipeTable from "@/components/recipe/RecipeTable"
import RecipeService from "@/services/RecipeService"
import { Recipe } from "@/types"
import Head from "next/head"
import { useEffect, useState } from "react"

const Recipes: React.FC = () => {

    const [recipes, setRecipes] = useState<Array<Recipe>>([])

    const getAllRecipes = async () => {
        RecipeService.getAllRecipes()
            .then((response) => response.json())
            .then((recipes) => setRecipes(recipes.reverse()))
    }

    useEffect(() =>  {
        getAllRecipes()
    }, [])

    return (
        <>
            <Head>
                <title>Recipes</title>
            </Head>
            <Header/>
            <main>
                <RecipeTable recipes={recipes}/>
            </main>
        </>
    )
}

export default Recipes
