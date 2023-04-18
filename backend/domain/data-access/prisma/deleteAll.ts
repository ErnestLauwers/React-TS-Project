const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteAllData() {
  // Delete all records from every table in the database
  await prisma.Recipe.deleteMany();
  await prisma.Ingredient.deleteMany();
  // add more tables as needed

  console.log("All data deleted from the database");
}

deleteAllData()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });