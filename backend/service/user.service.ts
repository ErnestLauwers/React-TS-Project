import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';
import { UserInput, EditUserInput, LoginInput } from '../types/types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => userDb.getUserById(id)

const deleteUser = async (id: number): Promise<User> => userDb.deleteUser(id);

const getUserByUsername = async (username: string): Promise<User> => userDb.getUserByUsername(username);

const getUserLogin = async ({ username, password }: LoginInput): Promise<User> => {
    if (!username || username == null) {
        throw new Error('The username cannot be empty');
    }

    if (!password || password == null) {
        throw new Error('The password cannot be empty');
    }

    return await userDb.getUserByUsernameAndPassword(username, password);
}

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('The email format is invalid.');
    }

    if (!password || password == null) {
        throw new Error('The password of a User cannot be empty');
    }

    const users = await userDb.getAllUsers();
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.username == username) {
            throw new Error('There is already a user with this username');
        }
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('The email format is invalid.');
    }

    if (!password || password == null) {
        throw new Error('The password of a User cannot be empty');
    }

    const users = await userDb.getAllUsers();
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.id != id) {
            if (user.username == username) {
                throw new Error('There is already a user with this username');
            }
        }
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
    editUser,
    getUserByUsername, 
    getUserLogin
};