import { Ingredient } from '../model/ingredient';
import { mapToIngredients, mapToIngredient } from './ingredient.mapper';
import { prisma as database } from '../../init-db';

let id = 1;

const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredientsPrisma = await database.ingredient.findMany({
            include: { recipes: true },
        });
        return mapToIngredients(ingredientsPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.5');
    }
};

const getIngredientById = async (id: number): Promise<Ingredient> => {
    if (database.ingredient.findUnique({where: { id: id,},})) {
        return null;
    }
    try {
        const ingredientPrisma = await database.ingredient.findUnique({
            where: {
                id: id,
            },
        });
        return mapToIngredient(ingredientPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details4.');
    }
}

const deleteIngredient = async (id: number): Promise<Ingredient> => {
    try {
        const deletedIngredient = await database.ingredient.findUnique({
            where: {
                id: id,
            },
            include: { recipes: true },
        });
        await database.ingredient.delete({
            where: {
                id: id,
            },
            include: { recipes: true },
        });
        return mapToIngredient(deletedIngredient);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details3.');
    }
}          

const addIngredient = async ({
    name,
    amountUsed,
}: {
    name: string;
    amountUsed: number;
}): Promise<Ingredient> => {
    try {
        const ingredientPrisma = await database.ingredient.create({
            data: {
                name,
                amountUsed,
            },
            include: {
                recipes: true,
            }
        });
        return mapToIngredient(ingredientPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to create an ingredient.')
    }
}

const editIngredient = async ({
    id,
    name,
    amountUsed,
}: {
    id: number,
    name: string;
    amountUsed: number,
}): Promise<Ingredient> => {
    try {
        const ingredientPrisma = await database.ingredient.update({
            where: { id },
            data: {
                name,
                amountUsed,
            },
        });
        return mapToIngredient(ingredientPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to update the ingredient')
    }
}


export default {
    getAllIngredients, 
    deleteIngredient, 
    getIngredientById,
    addIngredient,
    editIngredient
};