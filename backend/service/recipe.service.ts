import { Recipe } from '../domain/model/recipe';
import recipeDb from '../domain/data-access/recipe.db';
import { RecipeInput, EditRecipeInput } from '../types/types';
import ingredientService from './ingredient.service';

const getAllRecipes = async (): Promise<Recipe[]> => recipeDb.getAllRecipes();

const getRecipeById = async (id: number): Promise<Recipe> => recipeDb.getRecipeById(id)

const deleteRecipe = async (id: number): Promise<Recipe> => recipeDb.deleteRecipe(id);

const addRecipe = async ({ name, preparation, preparationTime, difficultyLevel, genre, userId, ingredientId }: RecipeInput): Promise<Recipe> => {
    if (!name || name == null) {
        throw new Error('The name of a Recipe cannot be empty');
    }
    
    if (!preparation || preparation == null) {
        throw new Error('The preparation of a User cannot be empty');
    }

    if (!preparationTime || Number.isNaN(preparationTime) || Number(preparationTime) < 0) {
        throw new Error('The preparation time is an invalid number.');
    }

    if (!difficultyLevel || Number.isNaN(difficultyLevel) || Number(difficultyLevel) < 0) {
        throw new Error('The difficulty level is an invalid number.');
    }

    if (!genre || genre == null) {
        throw new Error('The genre of a Recipe cannot be empty');
    }

    if (!userId || Number.isNaN(userId) || Number(userId) < 0) {
        throw new Error('The user id is an invalid number.');
    }

    if (!ingredientId || Number.isNaN(ingredientId) || Number(ingredientId) < 0) {
        throw new Error('A recipe must have a minimum of 1 ingredient.');
    }

    return await recipeDb.addRecipe({
        name: name,
        preparation: preparation,
        preparationTime: Number(preparationTime),
        difficultyLevel: Number(difficultyLevel),
        genre: genre,
        userId: Number(userId),
        ingredientId: Number(ingredientId)
    })
}

const editRecipe = async ({ id, name, preparation, preparationTime, difficultyLevel, genre }: EditRecipeInput): Promise<Recipe> => {
    if (!id || Number.isNaN(id) || Number(id) < 0) {
        throw new Error('The id is an invalid number.');
    }
    
    if (!name || name == null) {
        throw new Error('The name of a Recipe cannot be empty');
    }
    
    if (!preparation || preparation == null) {
        throw new Error('The preparation of a User cannot be empty');
    }

    if (!preparationTime || Number.isNaN(preparationTime) || Number(preparationTime) < 0) {
        throw new Error('The preparation time is an invalid number.');
    }

    if (!difficultyLevel || Number.isNaN(difficultyLevel) || Number(difficultyLevel) < 0) {
        throw new Error('The difficulty level is an invalid number.');
    }

    if (!genre || genre == null) {
        throw new Error('The genre of a Recipe cannot be empty');
    }

    return await recipeDb.editRecipe({
        id: Number(id),
        name: name,
        preparation: preparation,
        preparationTime: Number(preparationTime),
        difficultyLevel: Number(difficultyLevel),
        genre: genre
    })
}

export default {
    getAllRecipes, 
    deleteRecipe, 
    getRecipeById, 
    addRecipe, 
    editRecipe
};