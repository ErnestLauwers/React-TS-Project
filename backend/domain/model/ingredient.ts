import { Recipe } from "./recipe";

export class Ingredient {
    readonly id?: number
    readonly name: string
    readonly amountUsed: number;
    readonly recipes: Recipe[];

    constructor (ingredient: { id?: number, name: string, amountUsed: number, recipes: Recipe[] } ) {
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.amountUsed = ingredient.amountUsed;
    }

    equals( { id, name, amountUsed } ): boolean {
        return true;
    }

    static create( { id, name, amountUsed, recipes } ) {
        return new Ingredient({id, name, amountUsed, recipes});
    }
}