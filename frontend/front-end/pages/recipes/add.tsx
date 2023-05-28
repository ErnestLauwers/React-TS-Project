import Header from "@/components/Header"
import Head from "next/head"
import RecipeAddForm from "@/components/recipe/RecipeAddForm"
import { useState, useEffect } from 'react'
import styles from "../../styles/createRecipe.module.css"
import UserService from "@/services/UserService"

const AddRecipe: React.FC = () => {

    const [error, setError] = useState<string>() 

    const getUserLoggedIn = async () => {
        const response = await UserService.getUserwithUsername("");
        if (!response.ok) {
            if (response.status == 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(response.statusText);
            }
        }
    }

    useEffect(() =>  {
        getUserLoggedIn()
    }, [])

    return (
        <>
            <Head>
                <title>Create Recipe</title>
            </Head>
            <Header/>
            <main>
            {error ? (
                    <p className={styles.error}>An error ocurred: {error}</p>
                ) :
                <RecipeAddForm/>
            }
            </main>
        </>
    )
}

export default AddRecipe