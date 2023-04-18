import { Recipe } from "./recipe";

export class Ingredient {
    readonly id?: number
    readonly name: string
    readonly amountUsed: number;

    constructor (ingredient: { id?: number, name: string, amountUsed: number } ) {
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.amountUsed = ingredient.amountUsed;
    }

    equals( { id, name, amountUsed } ): boolean {
        return true;
    }

    static create( { id, name, amountUsed } ) {
        return new Ingredient({id, name, amountUsed });
    }
}