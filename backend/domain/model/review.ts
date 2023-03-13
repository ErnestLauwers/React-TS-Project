export class Review {
    readonly id?: number
    readonly score: number
    readonly comment: string

    constructor ( id: number, score: number, comment: string) {
        this.id = id;
        this.score = score;
        this.comment = comment;
    }
}