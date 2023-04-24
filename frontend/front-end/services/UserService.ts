const getAllUsers = async () => {
    return fetch("http://localhost:3000/users")
}

const getUserwithId = async (id: Number) => {
    return fetch(`http://localhost:3000/users/${id}`)
}

const getUserwithUsername = async (username: string) => {
    return fetch(`http://localhost:3000/users/search/${username}`)
}

const addUser = async (data: {firstName: string, lastName: string, username: string, email: string, password: string}) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    return fetch(`http://localhost:3000/users/add`, requestOptions)
}

const updateUser = async (data: {id: number, firstName: string, lastName: string, username: string, email: string, password: string}) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    return fetch(`http://localhost:3000/users/update`, requestOptions)
}

const deleteUser = async (id: number) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
    return fetch(`http://localhost:3000/users/delete/${id}`, requestOptions)
}

const UserService = {
    getAllUsers,
    getUserwithUsername,
    addUser,
    updateUser,
    deleteUser,
    getUserwithId
}

export default UserService