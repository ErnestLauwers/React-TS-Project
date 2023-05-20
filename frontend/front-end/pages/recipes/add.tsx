import Header from "@/components/Header"
import Head from "next/head"
import RecipeAddForm from "@/components/recipe/RecipeAddForm"


const AddRecipe: React.FC = () => {
    return (
        <>
            <Head>
                <title>Create Recipe</title>
            </Head>
            <Header/>
            <main>
                <RecipeAddForm/>
            </main>
        </>
    )
}

export default AddRecipe