import { Recipe } from '../domain/model/recipe';
import recipeDb from '../domain/data-access/recipe.db';
import { RecipeInput } from '../types/types';
import ingredientService from './ingredient.service';

const getAllRecipes = async (): Promise<Recipe[]> => recipeDb.getAllRecipes();

const getRecipeById = async (id: number): Promise<Recipe> => recipeDb.getRecipeById(id)

const deleteRecipe = (id: number): void => recipeDb.deleteRecipe(id);
/*
const addIngredient = async ({ name, preparation, preparationTime, difficultyLevel, genre, ingredientId }: RecipeInput): Promise<Recipe> => {
    if (!preparationTime || Number.isNaN(Number(preparationTime))) {
        throw new Error('PT is an invalid number.');
    }

    const ingredient = await ingredientService.getIngredientById( ingredientId );

    if (!ingredient) {
        throw new Error('No recipe exists with ID ${recipeId}');
    }

    return await recipeDb.addRecipe({
        name: name,
        amountUsed: amountUsed,
        recipeId: recipeId,
    })
}*/

export default {
    getAllRecipes, 
    deleteRecipe, 
    getRecipeById
};