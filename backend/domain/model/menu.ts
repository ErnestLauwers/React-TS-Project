import { Recipe } from './recipe'
import { Review } from './review'
export class Menu {
    readonly id?: number
    readonly name: string
    readonly comment: string
    readonly recipes: Recipe[]

    constructor ( id: number, name: string, comment: string, recipes: Recipe[]) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.recipes = recipes;
    }
}