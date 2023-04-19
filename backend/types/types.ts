export interface IngredientInput {
    name: string,
    amountUsed: string
}

export interface EditIngredientInput {
    id: number,
    name: string,
    amountUsed: string
}

export interface RecipeInput {
    name: string,
    preparation: string,
    preparationTime: number, 
    difficultyLevel: number, 
    genre: string,
    userId: Number, 
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

export interface UserInput {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
}

export interface EditUserInput {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
}

export interface PostInput {
    title: string,
    text: string,
    userId: number
}

export interface EditPostInput {
    id: number,
    title: string,
    text: string
}