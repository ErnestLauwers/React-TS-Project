import { Recipe } from '../domain/model/recipe';
import recipeDb from '../domain/data-access/recipe.db';

const getAllRecipes = (): Recipe[] => recipeDb.getAllRecipes();

const getRecipeById = (id: number): Recipe => recipeDb.getRecipeById(id)

const deleteRecipe = (id: number): void => recipeDb.deleteRecipe(id);

export default {
    getAllRecipes, 
    deleteRecipe, 
    getRecipeById
};