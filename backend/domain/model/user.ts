class User {
    readonly id?: number
    readonly firstName: string
    readonly lastName: string
    readonly username: string 
    readonly email: string
    readonly password: string
    readonly recipes: Recipe[]
    readonly menus: Menu[]
    readonly profile: Profile
}