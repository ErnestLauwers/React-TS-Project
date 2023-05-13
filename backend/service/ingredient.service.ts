import { Ingredient } from '../domain/model/ingredient';
import ingredientDb from '../domain/data-access/ingredient.db';
import { IngredientInput, EditIngredientInput } from '../types/types';
import { Recipe } from '@prisma/client';

const getAllIngredients = async (): Promise<Ingredient[]> => ingredientDb.getAllIngredients();

const getIngredientById = async (id: number): Promise<Ingredient> => ingredientDb.getIngredientById(id)

const deleteIngredient = async (id: number): Promise<Ingredient> => ingredientDb.deleteIngredient(id);

const addIngredient = async ({ name, amountUsed }: IngredientInput): Promise<Ingredient> => {
    if (!name || name == null) {
        throw new Error('The name of an Ingredient cannot be empty');
    }
    
    if (!amountUsed || Number.isNaN(Number(amountUsed)) || Number(amountUsed) < 0) {
        throw new Error('The amount used is an invalid number');
    }

    return await ingredientDb.addIngredient({
        name: name,
        amountUsed: Number(amountUsed),
    })
}

const editIngredient = async ({ id, name, amountUsed }: EditIngredientInput): Promise<Ingredient> => {
    if (!id || Number.isNaN(Number(id)) || Number(id) < 0) {
        throw new Error('The id is an invalid number');
    }
    
    if (!name || name == null) {
        throw new Error('The name of an Ingredient cannot be empty');
    }
    
    if (!amountUsed || Number.isNaN(Number(amountUsed)) || Number(amountUsed) < 0) {
        throw new Error('The amount used is an invalid number');
    }

    return await ingredientDb.editIngredient({
        id: Number(id),
        name: name,
        amountUsed: Number(amountUsed)
    })
}

const addIngredientToRecipe = async (ingredientId, recipeId): Promise<Recipe> => {
    if (!ingredientId || Number.isNaN(Number(ingredientId)) || Number(ingredientId) < 0) {
        throw new Error('The ingredient id is an invalid number.');
    }
    
    if (!recipeId || Number.isNaN(Number(recipeId)) || Number(recipeId) < 0) {
        throw new Error('The recipe id is an invalid number');
    }

    return await ingredientDb.addIngredientToRecipe(Number(ingredientId), Number(recipeId));
}

export default {
    getAllIngredients,
    addIngredient,
    deleteIngredient, 
    getIngredientById,
    editIngredient, 
    addIngredientToRecipe
};