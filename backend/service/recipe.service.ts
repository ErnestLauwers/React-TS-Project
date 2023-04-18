import { Recipe } from '../domain/model/recipe';
import recipeDb from '../domain/data-access/recipe.db';
import { RecipeInput, EditRecipeInput } from '../types/types';
import ingredientService from './ingredient.service';

const getAllRecipes = async (): Promise<Recipe[]> => recipeDb.getAllRecipes();

const getRecipeById = async (id: number): Promise<Recipe> => recipeDb.getRecipeById(id)

const deleteRecipe = async (id: number): Promise<Recipe> => recipeDb.deleteRecipe(id);

const addRecipe = async ({ name, preparation, preparationTime, difficultyLevel, genre, ingredientId }: RecipeInput): Promise<Recipe> => {
    if (!preparationTime || Number.isNaN(preparationTime)) {
        throw new Error('Amount Used is an invalid number.');
    }

    const ingredient = await ingredientService.getIngredientById( parseInt(ingredientId.toString()) );

    if (!ingredient) {
        throw new Error('No ingredient exists with this ID');
    }

    return await recipeDb.addRecipe({
        name: name,
        preparation: preparation,
        preparationTime: Number(preparationTime),
        difficultyLevel: Number(difficultyLevel),
        genre: genre,
        ingredientId: Number(ingredientId)
    })
}

const editRecipe = async ({ id, name, preparation, preparationTime, difficultyLevel, genre }: EditRecipeInput): Promise<Recipe> => {
    /*if (!amountUsed || Number.isNaN(Number(amountUsed))) {
        throw new Error('Amount Used is an invalid number.');
    }*/

    /*const recipe = await recipeService.getRecipeById( parseInt(recipeId) );

    if (!recipe) {
        throw new Error('No recipe exists with ID ${recipeId}');
    }*/

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