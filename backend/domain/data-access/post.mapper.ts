import { Post as PostPrisma } from "@prisma/client";
import { Post } from "../model/post";

const mapToPost = ({
    id, 
    title,
    text,
    createdAt,
    updatedAt,
    userId,
}: PostPrisma): Post =>
    new Post({ id, title, text, createdAt, updatedAt, userId });

const mapToPosts = (postsPrisma: PostPrisma[]): Post[] =>
    postsPrisma?.map(mapToPost);

export {
    mapToPost,
    mapToPosts
}