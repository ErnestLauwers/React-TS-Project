import { Recipe } from "./recipe";

export class Ingredient {
    readonly id?: number
    readonly name: string
    readonly amountUsed: number;
    readonly recipes: Recipe[];

    constructor ( id: number, name: string, amountUsed: number, recipes: Recipe[]) {
        this.id = id;
        this.name = name;
        this.amountUsed = amountUsed;
        this.recipes = recipes;
    }
}