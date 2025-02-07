const getAllPosts = async () => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/posts', requestOptions)
}

const getPost = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/posts/${id}`, requestOptions)
}

const deletePost = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/posts/delete/${id}`, requestOptions)
}

const addPost = async (post: {title: string, text: string, userId: number}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/add', requestOptions)
}

const updatePost = async (post: {id: number, title: string, text: string, userId: number}) => {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post)
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/update', requestOptions)
}

const PostService = {
    getAllPosts,
    getPost,
    deletePost,
    addPost,
    updatePost
}

export default PostService
