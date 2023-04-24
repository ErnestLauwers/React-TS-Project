const getAllIngredients = async () => {
    return fetch("http://localhost:3000/ingredients")
}

const getIngredient = async (id: number) => {
    return fetch(`http://localhost:3000/ingredients/${id}`)
}

const addIngredient = async (id: number) => {
    return fetch(`http://localhost:3000/ingredients/add/${id}`)
}

const updateIngredient = async (id: number) => {
    return fetch(`http://localhost:3000/ingredients/update/${id}`)
}

const deleteIngredient = async (id: number) => {
    return fetch(`http://localhost:3000/ingredients/delete/${id}`)
}

const IngredientService = {
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient
}

export default IngredientService