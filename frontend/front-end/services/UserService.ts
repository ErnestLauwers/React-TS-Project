const getAllUsers = async () => {
    console.log("UserService")
    return fetch(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL+'/users')
}

const UserService = {
    getAllUsers
}

export default UserService