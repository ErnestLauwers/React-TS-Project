import { Recipe } from '../domain/model/recipe';
import recipeDb from '../domain/data-access/recipe.db';

const getAllRecipes = (): Recipe[] => recipeDb.getAllRecipes();

export default {
    getAllRecipes
};