/**
 * @swagger 
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the recipe
 *         preparation:
 *           type: string
 *           description: The preparation of the recipe
 *         preparationTime:
 *           type: string
 *           description: The preparation time of the recipe
 *         difficultyLevel:
 *           type: string
 *           description: The difficulty level of the recipe
 *         genre:
 *           type: string
 *           description: The genre of the recipe
 *         userId:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *     RecipeInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: int64
 *           required: false
 *         name:
 *           type: string
 *           description: The name of the recipe
 *         preparation:
 *           type: string
 *           description: The preparation of the recipe
 *         preparationTime:
 *           type: string
 *           description: The preparation time of the recipe
 *         difficultyLevel:
 *           type: string
 *           description: The difficulty level of the recipe
 *         genre:
 *           type: string
 *           description: The genre of the recipe
 *         userId:
 *           type: string
 *         ingredientId:
 *           type: string
 *     EditRecipeInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: int64
 *           required: false
 *         name:
 *           type: string
 *           description: The name recipe
 *         preparation:
 *           type: string
 *           description: The preparation of the recipe
 *         preparationTime:
 *           type: string
 *           description: The preparation time of the recipe
 *         difficultyLevel:
 *           type: string
 *           description: The difficulty level of the recipe
 *         genre:
 *           type: string
 *           description: The genre of the recipe
 */

import express, { Request, Response } from 'express';
import recipeService from '../service/recipe.service';
import { RecipeInput, EditRecipeInput } from '../types/types';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes:
 *  get:
 *      summary: Get all recipes
 *      description: This API is used to get all recipes
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Returns recipes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Recipe'
 */
recipeRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allRecipes = await recipeService.getAllRecipes();
        response.status(200).json(allRecipes);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /recipes/{id}:
 *  get:
 *      summary: Get a recipe by ID
 *      description: This API is used to get a recipe by ID
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Returns a recipe
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/Recipe'
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Recipe ID
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 */
recipeRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allRecipes = await recipeService.getRecipeById(id);
        response.status(200).json(allRecipes);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /recipes/delete/{id}:
 *  delete:
 *      summary: Delete a recipe by ID
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the recipe to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          '200':
 *              description: The recipe was successfully deleted
 */
recipeRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const deletedRecipe  = await recipeService.deleteRecipe(id);
        response.status(200).json(deletedRecipe);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /recipes/add:
 *   post:
 *     summary: Add a new recipe
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 * 
 *     responses:
 *       '200':
 *         description: Returns the new Recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
recipeRouter.post('/add', async (request: Request, response: Response) => {
    const recipeInput = <RecipeInput>request.body;
    try {
        const recipe = await recipeService.addRecipe(recipeInput);
        response.status(200).json(recipe);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
});

/**
 * @swagger
 * /recipes/update:
 *   put:
 *     summary: Update an existing recipe
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditRecipeInput'
 * 
 *     responses:
 *       '200':
 *         description: Updates the Recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
recipeRouter.put('/update', async (request: Request, response: Response) => {
    const editRecipeInput = <EditRecipeInput>request.body;
    try {
        const updatedRecipe = await recipeService.editRecipe(editRecipeInput);
        response.status(200).json(updatedRecipe);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
})

export default recipeRouter;