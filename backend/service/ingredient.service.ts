import { Ingredient } from '../domain/model/ingredient';
import ingredientDb from '../domain/data-access/ingredient.db';

const getAllIngredients = (): Ingredient[] => ingredientDb.getAllIngredients();

const getIngredientById = (id: number): Ingredient => ingredientDb.getIngredientById(id)

const deleteIngredient = (id: number): void => ingredientDb.deleteIngredient(id);

export default {
    getAllIngredients,
    deleteIngredient, 
    getIngredientById
};