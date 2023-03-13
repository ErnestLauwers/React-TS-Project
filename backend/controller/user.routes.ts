import express, { Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allUsers = await userService.getAllUsers();
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

userRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allUsers = await userService.getUserById(id);
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

userRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    console.log('0')
    try {
        console.log('1')
        const id = Number(request.params.id);
        await userService.deleteUser(id);
        console.log('2')
        response.redirect('/users');
        console.log('3')
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

export default userRouter;