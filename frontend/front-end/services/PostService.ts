const getAllPosts = async () => {
    return fetch("http://localhost:3000/posts")
}

const getPost = async (id: number) => {
    return fetch(`http://localhost:3000/posts/${id}`)
}

const addPost = async (id: number) => {
    return fetch(`http://localhost:3000/posts/add/${id}`)
}

const updatePost = async (id: number) => {
    return fetch(`http://localhost:3000/posts/update/${id}`)
}

const deletePost = async (id: number) => {
    return fetch(`http://localhost:3000/posts/delete/${id}`)
}

const PostService = {
    getAllPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}

export default PostService