import { Recipe } from './recipe'
import { Menu } from './menu';
import { Profile }  from './profile';
import { Review } from './review';

export class User {
    readonly id?: number
    readonly firstName: string
    readonly lastName: string
    readonly username: string 
    readonly email: string
    readonly password: string
    readonly reviews: Review[]
    readonly recipes: Recipe[]
    readonly menus: Menu[]
    readonly profile: Profile

    constructor( id: number, firstName: string, lastName: string, username: string, email: string, password: string, reviews: Review[], recipes: Recipe[], menus: Menu[], profile: Profile ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName; 
        this.username = username;
        this.email = email;
        this.password = password; 
        this.reviews = reviews;
        this.recipes = recipes;
        this.menus = menus;
        this.profile = profile;
    }

}