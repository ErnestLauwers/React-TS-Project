import express, { Request, Response } from 'express';
import ingredientService from '../service/ingredient.service';


const ingredientRouter = express.Router();

ingredientRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allIngredients = await ingredientService.getAllIngredients();
        response.status(200).json(allIngredients);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

ingredientRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allIngredients = await ingredientService.getIngredientById(id);
        response.status(200).json(allIngredients);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

ingredientRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    console.log('0')
    try {
        console.log('1')
        const id = Number(request.params.id);
        await ingredientService.deleteIngredient(id);
        console.log('2')
        response.redirect('/ingredients');
        console.log('3')
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default ingredientRouter;