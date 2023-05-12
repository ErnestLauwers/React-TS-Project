const addIngredient = async (ingredient: {name: string, amountUsed: number}) => {
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

const IngredientService = {
    addIngredient
}

export default IngredientService
