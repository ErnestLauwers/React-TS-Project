import { Recipe } from '../domain/model/recipe';
import recipeDb from '../domain/data-access/recipe.db';

const getAllRecipes = async (): Promise<Recipe[]> => recipeDb.getAllRecipes();

const getRecipeById = async (id: number): Promise<Recipe> => recipeDb.getRecipeById(id)

const deleteRecipe = (id: number): void => recipeDb.deleteRecipe(id);

export default {
    getAllRecipes, 
    deleteRecipe, 
    getRecipeById
};