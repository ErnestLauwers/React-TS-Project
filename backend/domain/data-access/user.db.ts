import { User } from '../model/user';
import { prisma as database } from '../../init-db';
import { mapToUsers, mapToUser } from './user.mapper';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { recipes: true}
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
            include: { recipes: true },
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
            include: { recipes: true },
        });
        await database.user.delete({
            where: {
                id: id,
            },
            include: { recipes: true },
        });
        return mapToUser(deletedUser);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details3.');
    }
}          

export default {
    getAllUsers, 
    deleteUser, 
    getUserById
};