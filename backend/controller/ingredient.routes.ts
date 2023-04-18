 /**
 * @swagger 
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *         amountUsed:
 *           type: string
 *           description: The amount of the ingredient used
 *     IngredientInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: int64
 *           required: false
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *         amountUsed:
 *           type: string
 *           description: The amount of the ingredient used
 *         recipeId:
 *           type: string
 */
import express, { Request, Response } from 'express';
import ingredientService from '../service/ingredient.service';
import { IngredientInput } from '../types/types';


const ingredientRouter = express.Router();

/**
 * @swagger
 * /ingredients:
 *  get:
 *      summary: Get all ingredients
 *      description: This API is used to get all ingredients
 *      responses:
 *          200:
 *              description: Returns ingredients
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Ingredient'
 */
ingredientRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allIngredients = await ingredientService.getAllIngredients();
        response.status(200).json(allIngredients);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /ingredients/{id}:
 *  get:
 *      summary: Get an ingredient by ID
 *      description: This API is used to get an ingredient by ID
 *      responses:
 *          200:
 *              description: Returns an ingredient
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/Ingredient'
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Ingredient ID
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 */
ingredientRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allIngredients = await ingredientService.getIngredientById(id);
        response.status(200).json(allIngredients);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /ingredients/delete/{id}:
 *  delete:
 *      summary: Delete an ingredient by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the ingredient to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          '200':
 *              description: The ingredient was successfully deleted
 */
ingredientRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const deletedIngredient = await ingredientService.deleteIngredient(id);
        response.status(200).json(deletedIngredient);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/*
ingredientRouter.put('/update/:id', async (request: Request, repsonse: Response) => {
    const ingredientInput = <IngredientInput>request.body;
    const id = Number(request.params.id);
    try {
        const ingredient = await ingredientService.editIngredient(id, ingredientInput.name, ingredientInput.amountUsed);
        response.status(200).json(ingredient);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
})
*/

/**
 * @swagger
 * /ingredients/add:
 *   post:
 *     summary: Add a new ingredient to a recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientInput'
 * 
 *     responses:
 *       '200':
 *         description: Returns the new Ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 */
ingredientRouter.post('/add', async (request: Request, response: Response) => {
    const ingredientInput = <IngredientInput>request.body;
    try {
        const ingredient = await ingredientService.addIngredient(ingredientInput);
        response.status(200).json(ingredient);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
});

export default ingredientRouter;