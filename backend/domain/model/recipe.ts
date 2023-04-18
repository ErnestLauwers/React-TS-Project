import { Ingredient } from './ingredient';

export class Recipe {
    readonly id?: number
    readonly name: string
    readonly preparation: string
    readonly preparationTime: number
    readonly difficultyLevel: number
    readonly genre: string
    readonly userId: number
    readonly ingredients: Ingredient[]

    constructor( recipe: {id?: number, name: string, preparation: string, preparationTime: number, difficultyLevel: number, genre: string, userId: number, ingredients: Ingredient[] }) {
        this.id = recipe.id;
        this.name = recipe.name;
        this.preparation = recipe.preparation;
        this.preparationTime = recipe.preparationTime;
        this.difficultyLevel = recipe.difficultyLevel;
        this.genre = recipe.genre;
        this.userId = recipe.userId;
    }

    equals({ id, name, preparation, preparationTime, difficultyLevel, genre, userId, ingredients}): boolean {
        return true;
    }

    static create({ id, name, preparation, preparationTime, difficultyLevel, genre, userId, ingredients}) {
        
    }
}