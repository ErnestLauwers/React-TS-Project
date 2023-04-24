const getAllRecipes = async () => {
    return fetch("http://localhost:3000/recipes")
}

const getRecipe = async (id: number) => {
    return fetch(`http://localhost:3000/recipes/${id}`)
}

const addRecipe = async (id: number) => {
    return fetch(`http://localhost:3000/recipes/add/${id}`)
}
    
const updateRecipe = async (id: number) => {
    return fetch(`http://localhost:3000/recipes/update/${id}`)
}

const deleteRecipe = async (id: number) => {
    return fetch(`http://localhost:3000/recipes/delete/${id}`)
}

const RecipeService = {
    getAllRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe
}

export default RecipeService