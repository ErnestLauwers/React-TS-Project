import Header from "@/components/Header"
import Head from "next/head"
import RecipeAddForm from "@/components/recipe/RecipeAddForm"
import { useState, useEffect } from 'react'
import styles from "../../styles/createRecipe.module.css"
import UserService from "@/services/UserService"
import Error from '../../components/Error'

const AddRecipe: React.FC = () => {

    const [error, setError] = useState<string>() 

    const getUserLoggedIn = async () => {
        const response = await UserService.getAllUsers();
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
                    <Error error={error}/>
                ) :
                <RecipeAddForm/>
            }
            </main>
        </>
    )
}

export default AddRecipe