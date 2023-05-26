const addIngredient = async (ingredient: {id: number, name: string, amountUsed: number}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ingredient)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/ingredients/add', requestOptions)
}

const updateIngredient = async (ingredient: {id: number, name: string, amountUsed: number}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ingredient)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/ingredients/update', requestOptions)
}

const addIngredientToRecipe = async (data: {ingredientId: number, recipeId: number}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/ingredients/add/recipe', requestOptions)
}

const IngredientService = {
    addIngredient,
    addIngredientToRecipe,
    updateIngredient
}

export default IngredientService
