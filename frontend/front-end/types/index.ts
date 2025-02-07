export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    role: string
    password: string
    recipes: Recipe[]
    posts: Post[]
}

export interface Post {
    id: number
    title: string
    text: string
    createdAt: Date
    updatedAt: Date
    userId: number
}

export interface Ingredient {
    id: number
    name: string
    amountUsed: number
}

export interface Recipe {
    id: number
    name: string
    preparation: string
    preparationTime: Number
    difficultyLevel: number
    genre: string
    userId: number
    ingredients: Ingredient[]
}

export interface Error {
    status: string
    errorMessage: string
}
