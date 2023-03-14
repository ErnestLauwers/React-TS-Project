export class Ingredient {
    readonly id?: number
    readonly name: string
    readonly amountUsed: number;

    constructor (ingredient: { id?: number, name: string, amountUsed: number } ) {
        
    }

    equals( { id, name, amountUsed } ): boolean {
        return true;
    }

    static create( { id, name, amountUsed } ) {

    }
}