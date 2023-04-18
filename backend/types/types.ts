export interface IngredientInput {
    name: string,
    amountUsed: string
    recipeId: number
}

export interface RecipeInput {
    name: string,
    preparation: string,
    preparationTime: number, 
    difficultyLevel: number, 
    genre: string
    ingredientId: number
}

export interface EditRecipeInput {
    id: number,
    name: string,
    preparation: string,
    preparationTime: number, 
    difficultyLevel: number, 
    genre: string
}