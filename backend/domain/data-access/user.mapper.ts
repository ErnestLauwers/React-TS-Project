import { User as UserPrisma, Recipe as RecipePrisma, Post as PostPrisma } from '@prisma/client'
import { User } from '../model/user'
import { Recipe } from '../model/recipe'
import { Post } from '../model/post'
import { mapToRecipes } from './recipe.mapper'
import { mapToPosts } from './post.mapper'

const mapToUser = ({
    id,
    firstName,
    lastName,
    username, 
    email,
    role,
    password,
    recipes,
    posts,
}: UserPrisma & { recipes: RecipePrisma[], posts: PostPrisma[]}): User & { recipes: Recipe[], posts: Post[] }=>
    new User({
        id,
        firstName,
        lastName,
        username,
        email,
        role,
        password,
        recipes: mapToRecipes(recipes),
        posts: mapToPosts(posts)
});

const mapToUsers = (usersPrisma: (UserPrisma[])): User[] =>
    usersPrisma?.map(mapToUser);

export {
    mapToUser,
    mapToUsers
}