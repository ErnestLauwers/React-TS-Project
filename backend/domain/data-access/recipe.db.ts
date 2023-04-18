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
            include: { ingredients: true },
        });
    
        return mapToRecipe(recipePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.767');
    }
}

const deleteRecipe = async (id: number): Promise<Recipe> => {
    try {
        const deletedRecipe = await database.recipe.findUnique({
            where: {
                id: id,
            },
            include: { ingredients: true },
        });
        await database.recipe.delete({
            where: {
                id: id,
            },
            include: { ingredients: true },
        });
        return mapToRecipe(deletedRecipe);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details3.');
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

const editRecipe = async ({
    id,
    name,
    preparation,
    preparationTime,
    difficultyLevel,
    genre,
}: {
    id: number,
    name: string;
    preparation: string,
    preparationTime: number,
    difficultyLevel: number,
    genre: string,
}): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.update({
            where: { id },
            data: {
                name,
                preparation,
                preparationTime,
                difficultyLevel,
                genre,
            },
            include: {
                ingredients: true,
            }
        });
        return mapToRecipe(recipePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to update the recipe')
    }
}

export default {
    getAllRecipes,
    deleteRecipe, 
    getRecipeById,
    addRecipe, 
    editRecipe
};