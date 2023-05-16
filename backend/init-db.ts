import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  /*try {
    const hashedPassword = await bcrypt.hash("password", 12)
    const user1 = await prisma.user.create({
      data: {
        firstName: "David",
        lastName: "Walker",
        username: "davidwalker",
        email: "davidwalker@gmail.com",
        role: "user",
        password: hashedPassword,
        recipes: {
          create: [
            {
              name: "Scrambled Eggs",
              preparation: "Crack 3 eggs in a bowl and add 10 grams of salt and pepper. Mix everything together. Put a pan on maximum heat and add 20 grams of butter. When the butter is melted add the mixture and lower the heat. Keep mixing the eggs while it's cooking. When the eggs have a soft texture you can take it off.",
              preparationTime: 15,
              difficultyLevel: 3,
              genre: "Eggs",
              ingredients: {
                create: [
                  { name: "Eggs", amountUsed: 3},
                  { name: "Salt", amountUsed: 10},
                  { name: "Pepper", amountUsed: 10},
                  { name: "Butter", amountUsed: 20}
                ],
              },
            },
          ],
        },
        posts: {
          create: [
            {
              title: "Pineapple Pizza",
              text: "I can't understand how people eat pizza with pineapple. Like who invented to put fruit on a pizza? For me fruit doesn't belong on pizza and I will always stand by that! #NOFRUITONPIZZA",
            }
          ]
        }
      },
    });
    const user2 = await prisma.user.create({
      data: {
        firstName: "Ernest",
        lastName: "Lauwers",
        username: "ernestlauwers",
        email: "ernestlauwers@gmail.com",
        role: "admin",
        password: hashedPassword,
        recipes: {
        },
        posts: {
        },
      },
    });
    const user3 = await prisma.user.create({
      data: {
        firstName: "Igor",
        lastName: "Stefanovic",
        username: "igorstefanovic",
        email: "igorstefanovic@gmail.com",
        role: "admin",
        password: hashedPassword,
        recipes: {
        },
        posts: {
        },
      },
    });
    const user4 = await prisma.user.create({
      data: {
        firstName: "Jennifer",
        lastName: "Shelby",
        username: "jennifershelby",
        email: "jennifershelby@gmail.com",
        role: "user",
        password: hashedPassword,
        recipes: {
        },
        posts: {
          create: [
            {
              title: "Gordon Ramsay",
              text: "Just watched Hell's Kitchen with Gordon Ramsay the other night and it made me think. Being a professional cheff is so hard. Like there is so much pressure. I think I will stick to making recipes at home. #LMAO",
            },
            {
              title: "Cookies",
              text: "Just woke up and I really want some cookies. Don't ask me why but I really need me some cookies with milk and ASAP! #COOKIES #MILK",
            }
          ],
        },
      },
    });
    const user5 = await prisma.user.create({
      data: {
        firstName: "Lorraine",
        lastName: "Masson",
        username: "lorrainemasson",
        email: "lorrainemasson@gmail.com",
        role: "user",
        password: hashedPassword,
        recipes: {
          create: [
            {
              name: "Glazed Doughnuts",
              preparation: "1. Prepare the dough\n2. Let the dough rise in a warm environment, the dough rises in about 90 minutes \n3. Punch down the dough to release the air\n4. Roll & cut into doughnuts. Roll the dough out to 1/2 inch thickness. Cut the doughnuts using a 3-3.5 inch doughnut cutter. Place the doughnuts onto a lined baking sheet \n5. Prepare the oil. Heat the oil to 191°C \n6. Fry the doughnuts. Working with 2-3 doughnuts at a time, cook for 1 minute on each side. Carefully remove from the oil and place onto prepared rack \n 7. Make the glaze. Dip each warm doughnut into the glaze and coat both sides. After about 20 minutes, the glaze will set.",
              preparationTime: 120,
              difficultyLevel: 8,
              genre: "Doughnuts",
              ingredients: {
                create: [
                  { name: "Milk", amountUsed: 240},
                  { name: "Yeast", amountUsed: 15},
                  { name: "Sugar", amountUsed: 65},
                  { name: "Eggs", amountUsed: 2},
                  { name: "Butter", amountUsed: 86},
                  { name: "Pure Vanilla Extract", amountUsed: 5},
                  { name: "Flour", amountUsed: 500},
                ],
              },
            },
          ],
        },
        posts: {
          create: [
            {
              title: "Glazed Doughnuts",
              text: "So my family came over for Christmas and I though why don't try something new. So I tried making glazed doughnuts for the first time and man it didn't dissapoint. It's the best dessert I ever had. I will put up the recipe in a couple of minutes so everyone can try. #DESSERT #GLAZEDDOUGHNUTS",
            }
          ]
        },
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
