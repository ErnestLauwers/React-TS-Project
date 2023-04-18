import { User as UserPrisma, Recipe as RecipePrisma } from '@prisma/client'
import { User } from '../model/user'
import { Recipe } from '../model/recipe'
import { mapToRecipes } from './recipe.mapper'

const mapToUser = ({
    id,
    firstName,
    lastName,
    username, 
    email,
    password,
    recipes,
}: UserPrisma & { recipes: RecipePrisma[] }): User & { recipes: Recipe[] }=>
    new User({
        id,
        firstName,
        lastName,
        username,
        email,
        password,
        recipes: mapToRecipes(recipes)
});

const mapToUsers = (usersPrisma: (UserPrisma[])): User[] =>
    usersPrisma.map(mapToUser);

export {
    mapToUser,
    mapToUsers
}