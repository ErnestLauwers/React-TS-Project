/*
  Warnings:

  - You are about to drop the column `menuId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "menuId",
DROP COLUMN "userId";
