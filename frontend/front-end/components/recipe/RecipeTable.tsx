import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Recipe } from '@/types';
import styles from "../..//styles/recipeTable.module.css"
import UserService from '@/services/UserService';
import RecipeService from '@/services/RecipeService';


type Props = {
    recipes: Array<Recipe>
    back: string
}

const RecipeTable: React.FC<Props> = ({ recipes = [], back }: Props) => {

    const router = useRouter();

    const [users, setUsers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        async function fetchUsers() {
            const newUsers: { [key: number]: string } = {};
            for (const recipe of recipes) {
                if (recipe.userId && !users[recipe.userId]) {
                    const response = await UserService.getUserwithId(recipe.userId);
                    const user = await response.json()
                    newUsers[recipe.userId] = user.username;
                }
            }
            setUsers({ ...users, ...newUsers });
        }
        fetchUsers();
    }, [recipes]);

    const handleEdit = async (id: number) => {
        const response = await RecipeService.getRecipe(id)
        const recipe = await response.json()
        router.push({
            pathname: '/recipes/edit',
            query: { 
                recipe: JSON.stringify(recipe),
                back: back
            }
        })
    }

    const handleDelete = async (id: number) => {
        const response = await RecipeService.getRecipe(id)
        const recipe = await response.json()
        const username = users[recipe.userId]
        router.push({
            pathname: '/recipes/confirmation',
            query: { 
                recipe: JSON.stringify(recipe),
                username: username,
                back: back
            }
        })
    }

    const loggedInUser = sessionStorage.getItem("username")
    const userRole = sessionStorage.getItem("userRole")

    return (
        <>
            {recipes.length > 0 ? (
            recipes && recipes.map((recipe) => (
                <table className={styles.table}>
                    <tr className={styles.row}>
                        <td className={styles.name}>{recipe.name}</td>
                        <td className={styles.username}>{users[recipe.userId]}</td>
                    </tr>
                    <tr className={styles.row}>
                        <td className={styles.field}>Genre: {recipe.genre}</td>
                        <td className={styles.field}>Preperation Time: {Number(recipe.preparationTime)} minutes</td>
                        <td className={styles.field}>Difficulty Level: {Number(recipe.difficultyLevel)} / 10</td>
                    </tr>
                    <tr className={styles.row}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <td key={index} className={styles.ingredientBlock}>
                                    <span className={styles.bullet}></span>
                                    <td>{ingredient.name}:</td>
                                    <td className={styles.amount}>{ingredient.amountUsed}</td>
                                </td>
                            ))}
                        </tr>
                    <tr className={styles.row}>{recipe.preparation}</tr>
                    {userRole == "admin" ? (
                    <tr>
                        <td className={styles.button1} onClick={() => handleDelete(recipe.id)}>Delete</td>
                    </tr>
                    ): users[recipe.userId] === loggedInUser ? (
                    <tr className={styles.buttons}>
                        <td className={styles.button} onClick={() => handleEdit(recipe.id)}>Edit</td>
                        <td className={styles.button} onClick={() => handleDelete(recipe.id)}>Delete</td>
                    </tr>
                    ): null}
                </table>
            ))
            ) : (
                <p className={styles.error}>This user has not made any recipes yet!</p>
            )}
        </>
    )
}

export default RecipeTable
