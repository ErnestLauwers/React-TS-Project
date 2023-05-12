import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Recipe } from '@/types';
import styles from "../..//styles/post/postTable.module.css"
import UserService from '@/services/UserService';
import RecipeService from '@/services/RecipeService';


type Props = {
    recipes: Array<Recipe>
}

const RecipeTable: React.FC<Props> = ({ recipes = [] }: Props) => {

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
                username: username
            }
        })
    }

    const loggedInUser = sessionStorage.getItem("username")

    const handleCreateRecipe = () => {
        router.push('/recipes/add')
    }

    return (
        <>
            {recipes && recipes.map((recipe) => (
                console.log(recipe)
            ))}
            <button className={styles.add} onClick={handleCreateRecipe}>Create Recipe</button>
        </>
    )
}

export default RecipeTable

