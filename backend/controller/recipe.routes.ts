/**
 * @swagger 
 * components:
 *   schemas:
 *     Recipe   :
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *         preparation:
 *           type: string
 *           description: The amount of the ingredient used
 *         preparationTime:
 *           type: string
 *           description: The amount of the ingredient used
 *         difficultyLevel:
 *           type: string
 *           description: The amount of the ingredient used
 *         genre:
 *           type: string
 *           description: The amount of the ingredient used
 *         
 */

import express, { Request, Response } from 'express';
import recipeService from '../service/recipe.service';

const recipeRouter = express.Router();

/**
 * @swagger
 * /recipes:
 *  get:
 *      summary: Get all recipes
 *      description: This API is used to get all recipes
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

recipeRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    console.log('0')
    try {
        console.log('1')
        const id = Number(request.params.id);
        await recipeService.deleteRecipe(id);
        console.log('2')
        response.redirect('/recipes');
        console.log('3')
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default recipeRouter;