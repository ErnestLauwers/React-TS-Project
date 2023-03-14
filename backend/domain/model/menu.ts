import { Recipe } from './recipe'
export class Menu {
    readonly id?: number
    readonly name: string
    readonly comment: string
    readonly recipes: Recipe[]

    constructor (menu : { id?: number, name: string, comment: string, recipes: Recipe[] }) {
    
    }

    equals({ id, name, comment, recipes}): boolean {
        return true;
    }

    static create({ name, comment }) {

    }
}