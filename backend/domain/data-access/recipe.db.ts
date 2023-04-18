import { Recipe } from '../model/recipe';
import { prisma as database } from '../../init-db';
import { mapToRecipes, mapToRecipe } from './recipe.mapper';

let id = 1;

const recipes: Recipe[] = [
    
];

const getAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const recipesPrisma = await database.recipe.findMany({
            include: { ingredients: true}
        })
        return mapToRecipes(recipesPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.6');
    }
};

const getRecipeById = async (id: number): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.findUnique({
            where: {
                id: id,
            },
        });
        console.log(recipePrisma);
        console.log(mapToRecipe(recipePrisma));
        return mapToRecipe(recipePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.767');
    }
}

const deleteRecipe = (id: number): void => {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id == id) {
            recipes.splice(i, 1);
            break;
        }
    }
}          

const addRecipe = async ({
    name,
    preparation,
    preparationTime,
    difficultyLevel,
    genre,
    ingredientId,
}: {
    name: string;
    preparation: string,
    preparationTime: number,
    difficultyLevel: number,
    genre: string,
    ingredientId: number
}): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.create({
            data: {
                name,
                preparation,
                preparationTime,
                difficultyLevel,
                genre,
                ingredients: { connect: [{ id: ingredientId }] },
            },
            include: {
                ingredients: true,
            }
        });
        return mapToRecipe(recipePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to create an ingredient.recipe')
    }
}

export default {
    getAllRecipes,
    deleteRecipe, 
    getRecipeById,
    addRecipe
};