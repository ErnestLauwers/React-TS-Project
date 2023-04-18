export interface IngredientInput {
    name: string,
    amountUsed: string
    recipeId: string
}

export interface RecipeInput {
    name: string,
    preparation: string,
    preparationTime: number, 
    difficultyLevel: number, 
    genre: string
}