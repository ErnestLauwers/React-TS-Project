class Recipe {
    readonly id?: number
    readonly name: string
    readonly preparation: string
    readonly preparationTime: number
    readonly difficultyLevel: number
    readonly ingredients: Ingredient[]
    readonly genre: string
    readonly reviews: Review[]
}