import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  /*try {
    const user = await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        password: "password",
        recipes: {
          create: [
            {
              name: "Pasta with tomato sauce",
              preparation: "xxx",
              preparationTime: 50,
              difficultyLevel: 5,
              genre: "pasta",
              ingredients: {
                create: [
                  { name: "Pasta", amountUsed: 200},
                  { name: "Tomato sauce", amountUsed: 1},
                ],
              },
            },
            {
              name: "Chicken curry",
              preparation: "yyy",
              preparationTime: 60,
              difficultyLevel: 7,
              genre: "curry",
              ingredients: {
                create: [
                  { name: "Chicken", amountUsed: 500},
                  { name: "Curry powder", amountUsed: 2},
                ],
              },
            },
          ],
        },
        posts: {
          create: [
            {
              title: "Titel 1",
              text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            },
            {
              title: "Titel 2",
              text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            }
          ]
        }
      },
    });
  } catch (error) {
    console.error(error);
  }*/
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

  export {
    prisma
  }
