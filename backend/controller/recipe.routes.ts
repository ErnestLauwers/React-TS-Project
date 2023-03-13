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