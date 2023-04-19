const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteAllData() {
  await prisma.Post.deleteMany({ where: { userId: { not: undefined } } });
  await prisma.Recipe.deleteMany({ where: { userId: { not: undefined } } });
  await prisma.User.deleteMany();
  await prisma.Post.deleteMany();
  await prisma.Recipe.deleteMany();
  await prisma.Ingredient.deleteMany();

  console.log("All data deleted from the database");
}

deleteAllData()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });