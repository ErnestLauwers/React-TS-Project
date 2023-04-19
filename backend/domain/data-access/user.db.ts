import { User } from '../model/user';
import { prisma as database } from '../../init-db';
import { mapToUsers, mapToUser } from './user.mapper';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { recipes: true, 
                posts: true }
        })
        return mapToUsers(usersPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.6');
    }
};

const getUserById = async (id: number): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
            include: { recipes: true, posts: true },
        });
        return mapToUser(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.767');
    }
}

const deleteUser = async (id: number): Promise<User> => {
    try {
        const deletedUser = await database.user.findUnique({
            where: {
                id: id,
            },
            include: { recipes: true, posts: true },
        });
        await database.recipe.deleteMany({
            where: {
                userId: id,
            },
        });
        await database.post.deleteMany({
            where: {
                userId: id,
            },
        });
        await database.user.delete({
            where: {
                id: id,
            },
        });
        return mapToUser(deletedUser);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details3.');
    }
}

const addUser = async ({
    firstName,
    lastName,
    username,
    email,
    password,
}: {
    firstName: string;
    lastName: string,
    username: string,
    email: string,
    password: string,
}): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password,
                recipes: { create: [] },
                posts: { create: [] },
            },
            include: {
                recipes: true,
                posts: true,
            }
        });
        return mapToUser(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to create an ingredient.recipe')
    }
}

const editUser = async ({
    id,
    firstName,
    lastName,
    username,
    email,
    password,
}: {
    id: number,
    firstName: string;
    lastName: string,
    username: string,
    email: string,
    password: string,
}): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
                username,
                email,
                password,
            },
            include: {
                recipes: true,
                posts: true,
            }
        });
        return mapToUser(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to update the user')
    }
}


export default {
    getAllUsers, 
    deleteUser, 
    getUserById, 
    addUser,
    editUser
};