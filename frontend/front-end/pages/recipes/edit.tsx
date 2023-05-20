import Header from "@/components/Header"
import Head from "next/head"
import RecipeEditForm from "@/components/recipe/RecipeEditForm"

const Edit: React.FC = () => {
    return (
        <>
            <Head>
                <title>Edit Recipe</title>
            </Head>
            <Header/>
            <main>
                <RecipeEditForm/>
            </main>
        </>
    )
}

export default Edit