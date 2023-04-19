import { Recipe } from './recipe'
import { Post } from './post';

export class User {
    readonly id?: number
    readonly firstName: string
    readonly lastName: string
    readonly username: string 
    readonly email: string
    readonly password: string
    readonly recipes: Recipe[]
    readonly posts: Post[]

    constructor( user: {id?: number, firstName: string, lastName: string, username: string, email: string, password: string, recipes: Recipe[], posts: Post[]}) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName; 
        this.username = user.username;
        this.email = user.email;
        this.password = user.password; 
        this.recipes = user.recipes;
        this.posts = this.posts;
    }

    equals({ id, firstName, lastName, username, email, password, ingredients, recipes, posts}): boolean {
        return true;
    }

    static create({ id, firstName, lastName, username, email, password, recipes, posts}) {
        
    }
}