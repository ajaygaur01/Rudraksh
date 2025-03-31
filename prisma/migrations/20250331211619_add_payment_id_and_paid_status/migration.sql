/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `Order` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'PAID';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentStatus";
