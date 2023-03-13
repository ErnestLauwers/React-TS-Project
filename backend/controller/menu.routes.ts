import express, { Request, Response } from 'express';
import menuService from '../service/menu.service';

const menuRouter = express.Router();

menuRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allMenus = await menuService.getAllMenus();
        response.status(200).json(allMenus);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

menuRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allMenus = await menuService.getMenuById(id);
        response.status(200).json(allMenus);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

menuRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    console.log('0')
    try {
        console.log('1')
        const id = Number(request.params.id);
        await menuService.deleteMenu(id);
        console.log('2')
        response.redirect('/menus');
        console.log('3')
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default menuRouter;