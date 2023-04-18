import { Ingredient } from '../domain/model/ingredient';
import ingredientDb from '../domain/data-access/ingredient.db';
import { IngredientInput, EditIngredientInput } from '../types/types';

const getAllIngredients = async (): Promise<Ingredient[]> => ingredientDb.getAllIngredients();

const getIngredientById = async (id: number): Promise<Ingredient> => ingredientDb.getIngredientById(id)

const deleteIngredient = async (id: number): Promise<Ingredient> => ingredientDb.deleteIngredient(id);

const addIngredient = async ({ name, amountUsed }: IngredientInput): Promise<Ingredient> => {
    /*if (!amountUsed || Number.isNaN(Number(amountUsed))) {
        throw new Error('Amount Used is an invalid number.');
    }*/

    /*const recipe = await recipeService.getRecipeById( parseInt(recipeId) );

    if (!recipe) {
        throw new Error('No recipe exists with ID ${recipeId}');
    }*/

    return await ingredientDb.addIngredient({
        name: name,
        amountUsed: Number(amountUsed),
    })
}

const editIngredient = async ({ id, name, amountUsed }: EditIngredientInput): Promise<Ingredient> => {
    /*if (!amountUsed || Number.isNaN(Number(amountUsed))) {
        throw new Error('Amount Used is an invalid number.');
    }*/

    /*const recipe = await recipeService.getRecipeById( parseInt(recipeId) );

    if (!recipe) {
        throw new Error('No recipe exists with ID ${recipeId}');
    }*/

    return await ingredientDb.editIngredient({
        id: Number(id),
        name: name,
        amountUsed: Number(amountUsed)
    })
}

export default {
    getAllIngredients,
    addIngredient,
    deleteIngredient, 
    getIngredientById,
    editIngredient
};