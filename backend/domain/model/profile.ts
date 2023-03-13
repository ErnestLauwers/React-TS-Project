export class Profile {
    readonly id?: number
    readonly bio: string
    readonly birthdate: Date
    readonly gender: string

    constructor ( id: number, bio: string, birthdate: Date, gender: string) {
        this.id = id;
        this.bio = bio;
        this.birthdate = birthdate;
        this.gender = gender;
    }
}