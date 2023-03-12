import { Ingredient } from './ingredient';
import { Review } from './review';

export class Recipe {
    readonly id?: number
    readonly name: string
    readonly preparation: string
    readonly preparationTime: number
    readonly difficultyLevel: number
    readonly ingredients: Ingredient[]
    readonly genre: string
    readonly reviews: Review[]

    constructor( id: number, name: string, preparation: string, preparationTime: number, difficultyLevel: number, ingredients: Ingredient[], genre: string, reviews: Review[]) {
        this.id = id;
        this.name = name;
        this.preparation = preparation;
        this.preparationTime = preparationTime;
        this.difficultyLevel = difficultyLevel;
        this.ingredients = ingredients;
        this.genre = genre;
        this.reviews = reviews;
    }
}