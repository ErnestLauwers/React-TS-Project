import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';
import { UserInput, EditUserInput } from '../types/types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => userDb.getUserById(id)

const deleteUser = async (id: number): Promise<User> => userDb.deleteUser(id);

const addUser = async ({ firstName, lastName, username, email, password }: UserInput): Promise<User> => {
    if (!firstName || firstName == null) {
        throw new Error('The first name of a User cannot be empty');
    }

    if (!lastName || lastName == null) {
        throw new Error('The last name of a User cannot be empty');
    }

    if (!username || username == null) {
        throw new Error('The username of a User cannot be empty');
    }
    
    if (!email || email == null) {
        throw new Error('The email of a User cannot be empty');
    }

    if (!password || password == null) {
        throw new Error('The password of a User cannot be empty');
    }

    return await userDb.addUser({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
    })
}

const editUser = async ({ id, firstName, lastName, username, email, password }: EditUserInput): Promise<User> => {
    if (!id || Number.isNaN(id) || Number(id) < 0) {
        throw new Error('The id is an invalid number.');
    }
    
    if (!firstName || firstName == null) {
        throw new Error('The first name of a User cannot be empty');
    }

    if (!lastName || lastName == null) {
        throw new Error('The last name of a User cannot be empty');
    }

    if (!username || username == null) {
        throw new Error('The username of a User cannot be empty');
    }
    
    if (!email || email == null) {
        throw new Error('The email of a User cannot be empty');
    }

    if (!password || password == null) {
        throw new Error('The password of a User cannot be empty');
    }

    return await userDb.editUser({
        id: Number(id),
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
    })
}


export default {
    getAllUsers,
    deleteUser, 
    getUserById,
    addUser,
    editUser
};