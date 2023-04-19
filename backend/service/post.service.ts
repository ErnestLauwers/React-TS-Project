import { Post } from '../domain/model/post';
import postDb from '../domain/data-access/post.db';
import { PostInput, EditPostInput } from '../types/types';
import { timeLog } from 'console';

const getAllPosts = async (): Promise<Post[]> => postDb.getAllPosts();

const getPostById = async (id: number): Promise<Post> => postDb.getPostById(id)

const deletePost = async (id: number): Promise<Post> => postDb.deletePost(id);

const addPost = async ({ title, text, userId }: PostInput): Promise<Post> => {
    return await postDb.addPost({
        title: title,
        text: text,
        userId: Number(userId),
    })
}

const editPost = async ({ id, title, text }: EditPostInput): Promise<Post> => {
    /*if (!amountUsed || Number.isNaN(Number(amountUsed))) {
        throw new Error('Amount Used is an invalid number.');
    }*/

    /*const recipe = await recipeService.getRecipeById( parseInt(recipeId) );

    if (!recipe) {
        throw new Error('No recipe exists with ID ${recipeId}');
    }*/

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