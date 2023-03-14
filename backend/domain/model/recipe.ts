import { Ingredient } from './ingredient';

export class Recipe {
    readonly id?: number
    readonly name: string
    readonly preparation: string
    readonly preparationTime: number
    readonly difficultyLevel: number
    readonly ingredients: Ingredient[]
    readonly genre: string

    constructor( recipe: {id?: number, name: string, preparation: string, preparationTime: number, difficultyLevel: number, ingredients: Ingredient[], genre: string }) {
        
    }

    equals({ id, name, preparation, preparationTime, difficultyLevel, genre, ingredients}): boolean {
        return true;
    }

    static create({ id, name, preparation, preparationTime, difficultyLevel, genre, ingredients }) {
        
    }
}