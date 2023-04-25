const getAllUsers = async () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users', requestOptions)
}

const getUserwithId = async (id: Number) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${id}`, requestOptions)
}

const getUserwithUsername = async (username: string) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/search/${username}`, requestOptions)
}

const addUser = async (user: {firstName: string, lastName: string, username: string, email: string, password: string}) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/add', requestOptions)
}

const updateUser = async (data: {id: number, firstName: string, lastName: string, username: string, email: string, password: string}) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/update', requestOptions)
}

const deleteUser = async (id: number) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/delete/${id}`, requestOptions)
}

const UserService = {
    getAllUsers,
    getUserwithId,
    getUserwithUsername,
    addUser,
    updateUser,
    deleteUser,
}

export default UserService
