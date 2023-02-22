class User {
    readonly id?: number
    readonly name: string
    readonly username: string 
    readonly email: string
    readonly password: string
    readonly recipes: Recipe[]
    readonly menus: Menu[]
    readonly profile: Profile
}