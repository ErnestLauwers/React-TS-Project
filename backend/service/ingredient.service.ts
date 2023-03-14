import { Ingredient } from '../domain/model/ingredient';
import ingredientDb from '../domain/data-access/ingredient.db';
import recipeService from './recipe.service';
import { IngredientInput } from '../types/types';

const getAllIngredients = async (): Promise<Ingredient[]> => ingredientDb.getAllIngredients();

const getIngredientById = async (id: number): Promise<Ingredient> => ingredientDb.getIngredientById(id)

const deleteIngredient = async (id: number): Promise<Ingredient> => ingredientDb.deleteIngredient(id);

const addIngredient = async ({ recipeId, name, amountUsed }: IngredientInput): Promise<Ingredient> => {
    if (!amountUsed || Number.isNaN(Number(amountUsed))) {
        throw new Error('Amount Used is an invalid number.');
    }

    const recipe = await recipeService.getRecipeById( recipeId );
    if (!recipe) {
        throw new Error('No recipe exists with ID ${recipeId}');
    }

    return await ingredientDb.addIngredient({
        name: name,
        amountUsed: amountUsed,
        recipeId: recipeId,
    })
}

const editIngredient = async (id: number, name: string, amountUsed: number): Promise<void> => {
    if (!name) {
        name = (await ingredientDb.getIngredientById(id)).name;
    }
    if (!amountUsed) {
        amountUsed = (await ingredientDb.getIngredientById(id)).amountUsed;
    }
    ingredientDb.editIngredient(id, name, amountUsed);
}

export default {
    getAllIngredients,
    deleteIngredient, 
    getIngredientById,
    addIngredient,
    editIngredient
};