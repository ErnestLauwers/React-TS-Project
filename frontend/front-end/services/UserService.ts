const getAllUsers = async () => {
    const token = sessionStorage.getItem("token");
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
}

const getUserwithId = async (id: Number) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${id}`, requestOptions)
}

const getUserwithUsername = async (username: string) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/search/${username}`, requestOptions)
}

const addUser = async (user: {firstName: string, lastName: string, username: string, email: string, password: string}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/add', requestOptions)
}

const updateUser = async (data: {id: number, firstName: string, lastName: string, username: string, email: string, password: string}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,    
        },
        body: JSON.stringify(data)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/update', requestOptions)
}

const deleteUser = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,    
        },
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/delete/${id}`, requestOptions)
}

const loginUser = async (username: string, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', requestOptions)
}

const UserService = {
    getAllUsers,
    getUserwithId,
    getUserwithUsername,
    addUser,
    updateUser,
    deleteUser,
    loginUser
}

export default UserService
