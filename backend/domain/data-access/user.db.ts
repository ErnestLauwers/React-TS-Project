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
        throw new Error('Database error. See server log for details');
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
        throw new Error('There was no user found with this id');
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
        throw new Error('Database error. See server log for details');
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
        throw new Error('There was a Database error trying to create a User')
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

const getUserByUsername = async (username: string): Promise<User> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { recipes: true, 
                posts: true }
        })
        const allUsers = mapToUsers(usersPrisma);
        let foundUser = null;
        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            if (user.username == username) {
                foundUser = user;
            }
        } 
        if (foundUser != null) {
            return foundUser;
        } else {
            throw new Error('There was no user found with this username');
        }
    } catch (error) {
        console.log(error);
        throw new Error('There was no user found with this username');
    }
}

const getUserByUsernameAndPassword = async (username: string, password: string): Promise<User> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { recipes: true, 
                posts: true }
        })
        const allUsers = mapToUsers(usersPrisma);
        let foundUser = null;
        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            if (user.username == username && user.password == password) {
                foundUser = user;
            }
        } 
        if (foundUser != null) {
            return foundUser;
        } else {
            throw new Error('Please use the correct credentials to login');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Please use the correct credentials to login');
    }
}

export default {
    getAllUsers, 
    deleteUser, 
    getUserById, 
    addUser,
    editUser,
    getUserByUsername, 
    getUserByUsernameAndPassword
};