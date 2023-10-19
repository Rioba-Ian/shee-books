/*
  Warnings:

  - You are about to drop the column `date_pub` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "date_pub",
ADD COLUMN     "year_pub" INTEGER;
