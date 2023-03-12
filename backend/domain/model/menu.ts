import { Recipe } from './recipe'

export class Menu {
    readonly id?: number
    readonly name: string
    readonly comment: string
    readonly recipes: Recipe[]
    readonly reviews: Review[]
}