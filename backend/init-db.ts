// Execute: npx ts-node init-db.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
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
    });
  } catch (error) {
    console.error(error);
  }
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
