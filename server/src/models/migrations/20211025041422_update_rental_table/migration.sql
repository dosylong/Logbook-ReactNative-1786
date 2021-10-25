/*
  Warnings:

  - You are about to drop the column `rentPrice` on the `Rental` table. All the data in the column will be lost.
  - Added the required column `rentalPrice` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "rentPrice",
ADD COLUMN     "rentalPrice" INTEGER NOT NULL;
