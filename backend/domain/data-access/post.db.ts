import { Post } from '../model/post';
import { prisma as database } from '../../init-db';
import { mapToPosts, mapToPost } from './post.mapper';

const getAllPosts = async (): Promise<Post[]> => {
    try {
        const postsPrisma = await database.post.findMany({
        })
        return mapToPosts(postsPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details');
    }
};

const getPostById = async (id: number): Promise<Post> => {
    try {
        const postPrisma = await database.post.findUnique({
            where: {
                id: id,
            },
        });
        return mapToPost(postPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('There was no post found with this id');
    }
}

const deletePost = async (id: number): Promise<Post> => {
    try {
        const deletedPost = await database.post.findUnique({
            where: {
                id: id,
            },
        });
        await database.post.delete({
            where: {
                id: id,
            },
        });
        return mapToPost(deletedPost);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details');
    }
}          


const addPost = async ({
    title,
    text,
    userId,
}: {
    title: string;
    text: string,
    userId: number
}): Promise<Post> => {
    try {
        const postPrisma = await database.post.create({
            data: {
                title,
                text,
                userId
            },
        });
        return mapToPost(postPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to create a Post')
    }
}

const editPost = async ({
    id,
    title,
    text,
}: {
    id: number,
    title: string;
    text: string,
}): Promise<Post> => {
    try {
        const postPrisma = await database.post.update({
            where: { id },
            data: {
                title,
                text,
            },
        });
        return mapToPost(postPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('There was a Database error trying to update the post')
    }
}

export default {
    getAllPosts,
    deletePost, 
    getPostById,
    addPost, 
    editPost
};