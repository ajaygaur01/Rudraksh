/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - Made the column `description` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Review_userId_productId_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "updatedAt",
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "description" SET NOT NULL;
