import express, { Request, Response } from 'express';
import recipeService from '../service/recipe.service';

const recipeRouter = express.Router();

recipeRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allRecipes = await recipeService.getAllRecipes();
        response.status(200).json(allRecipes);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default recipeRouter;