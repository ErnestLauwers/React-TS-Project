import { Ingredient } from '../model/ingredient';
import { mapToIngredients, mapToIngredient } from './ingredient.mapper';
import { prisma as database } from '../../init-db';

let id = 1;

/*const ingredients: Ingredient[] = [
    new Ingredient( id++, 'suiker', 56 ),
    new Ingredient( id++, 'tomaat', 23 ),
];*/

const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredientsPrisma = await database.ingredient.findMany({
            include: { recipes: true },
        });
        return mapToIngredients(ingredientsPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getIngredientById = async (id: number): Promise<Ingredient> => {
    try {
        const ingredientPrisma = await database.ingredient.findUnique({
            where: {
                id: id,
            },
        });
        return mapToIngredient(ingredientPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteIngredient = async (id: number): Promise<Ingredient> => {
    try {
        const deletedIngredient = await database.ingredient.findUnique({
            where: {
                id: id,
            },
        });
        await database.ingredient.delete({
            where: {
                id: id,
            },
        });
        return mapToIngredient(deletedIngredient);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
}          

const addIngredient = async ({
    name,
    amountUsed,
    recipeId,
}: {
    name: string;
    amountUsed: number;
    recipeId: number;
}): Promise<Ingredient> => {
    try {
        const ingredientPrisma = await database.ingredient.create({
            data: {
                name,
                amountUsed,
                recipes: { connect: [{ id: recipeId }] },
            },
            include: {
                recipes: true,
            }
        });
        return mapToIngredient(ingredientPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const editIngredient = async (
    id: number,
    name: string,
    amountUsed: number
): Promise<void> => {
    try {
        const ingredientPrisma = await database.ingredient.update({
            where: {
                id: id,
            },
            data: {
                name,
                amountUsed,
            },
        });
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllIngredients, 
    deleteIngredient, 
    getIngredientById,
    addIngredient,
    editIngredient
};