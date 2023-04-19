export class Post {
    readonly id?: number
    readonly title: string
    readonly text: string
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly userId: number

    constructor (post : { id?: number, title: string, text: string, createdAt: Date, updatedAt: Date, userId: number }) {
        this.id = post.id;
        this.title = post.title;
        this.text = post.text;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.userId = post.userId;
    }

    equals({ id, title, text, createdAt, updatedAt, userId}): boolean {
        return true;
    }

    static create({ id, title, text, createdAt, updatedAt, userId }) {

    }
}