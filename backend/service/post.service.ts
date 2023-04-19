import { Post } from '../domain/model/post';
import postDb from '../domain/data-access/post.db';
import { PostInput, EditPostInput } from '../types/types';
import { timeLog } from 'console';

const getAllPosts = async (): Promise<Post[]> => postDb.getAllPosts();

const getPostById = async (id: number): Promise<Post> => postDb.getPostById(id)

const deletePost = async (id: number): Promise<Post> => postDb.deletePost(id);

const addPost = async ({ title, text, userId }: PostInput): Promise<Post> => {
    if (title == null || !title) {
        throw new Error('The title of a Post cannot be empty');
    }

    if (text == null || !text) {
        throw new Error('The text of a Post cannot be empty');
    }

    if (!userId || Number.isNaN(Number(userId)) || Number(userId) < 0) {
        throw new Error('The user id is an invalid number');
    }

    return await postDb.addPost({
        title: title,
        text: text,
        userId: Number(userId),
    })
}

const editPost = async ({ id, title, text }: EditPostInput): Promise<Post> => {
    if (!id || Number.isNaN(Number(id)) || Number(id) < 0) {
        throw new Error('The id is an invalid number');
    }

    if (title == null || !title) {
        throw new Error('The title of a Post cannot be empty');
    }

    if (text == null || !text) {
        throw new Error('The text of a Post cannot be empty');
    }

    return await postDb.editPost({
        id: Number(id),
        title: title,
        text: text
    })
}

export default {
    getAllPosts, 
    deletePost, 
    getPostById, 
    addPost, 
    editPost
};