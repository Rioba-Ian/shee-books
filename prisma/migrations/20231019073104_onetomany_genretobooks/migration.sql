/*
  Warnings:

  - Made the column `genreId` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_genreId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "genreId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
