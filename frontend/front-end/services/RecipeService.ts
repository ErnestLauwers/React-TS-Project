import { Ingredient } from "@/types";

const getAllRecipes = async () => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/recipes', requestOptions)
}

const getRecipe = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/recipes/${id}`, requestOptions)
}

const deleteRecipe = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/recipes/delete/${id}`, requestOptions)
}

const addRecipe = async (recipe: {name: string, preparation: string, preparationTime: number, difficultyLevel: number, genre: string, userId: number, ingredients: Ingredient[]}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipe)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/recipes/add', requestOptions)
}

const updateRecipe = async (recipe: {name: string, preparation: string, preparationTime: number, difficultyLevel: number, genre: string, userId: number}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipe)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/recipes/update', requestOptions)
}

const RecipeService = {
    getAllRecipes,
    getRecipe,
    deleteRecipe,
    addRecipe,
    updateRecipe
}

export default RecipeService
