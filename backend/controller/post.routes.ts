/**
 * @swagger 
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         text:
 *           type: string
 *           description: The text of the post
 *         createdAt:
 *           type: string
 *           description: The time that the post was created
 *         updatedAt:
 *           type: string
 *           description: The time that the post was last updated
 *         userId:
 *           type: string
 *     PostInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: int64
 *           required: false
 *         title:
 *           type: string
 *           description: The title of the post
 *         text:
 *           type: string
 *           description: The text of the post
 *         userId:
 *           type: string
 *     EditPostInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: int64
 *           required: false
 *         title:
 *           type: string
 *           description: The title of the post
 *         text:
 *           type: string
 *           description: The text of the post
 */
import express, { Request, Response } from 'express';
import postService from '../service/post.service';
import { PostInput, EditPostInput } from '../types/types';

const postRouter = express.Router();

/**
 * @swagger
 * /posts:
 *  get:
 *      summary: Get all posts
 *      description: This API is used to get all posts
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Returns posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Post'
 */
postRouter.get('/', async (request: Request, response: Response) => {
    try {
        const allPosts = await postService.getAllPosts();
        response.status(200).json(allPosts);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /posts/{id}:
 *  get:
 *      summary: Get a post by ID
 *      description: This API is used to get a post by ID
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Returns a post
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/Post'
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Post ID
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 */
postRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const allPosts = await postService.getPostById(id);
        response.status(200).json(allPosts);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /posts/delete/{id}:
 *  delete:
 *      summary: Delete a post by ID
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the post to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          '200':
 *              description: The post was successfully deleted
 */
postRouter.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const deletedPost  = await postService.deletePost(id);
        response.status(200).json(deletedPost);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /posts/add:
 *   post:
 *     summary: Add a new post
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 * 
 *     responses:
 *       '200':
 *         description: Returns the new Post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
postRouter.post('/add', async (request: Request, response: Response) => {
    const postInput = <PostInput>request.body;
    try {
        const post = await postService.addPost(postInput);
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
});

/**
 * @swagger
 * /posts/update:
 *   put:
 *     summary: Update an existing post
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditPostInput'
 * 
 *     responses:
 *       '200':
 *         description: Updates the Post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
postRouter.put('/update', async (request: Request, response: Response) => {
    const editPostInput = <EditPostInput>request.body;
    try {
        const updatedPost= await postService.editPost(editPostInput);
        response.status(200).json(updatedPost);
    } catch (error) {
        response.status(500).json({ status: 'error', errorMessage: error.message});
    }
})

export default postRouter;