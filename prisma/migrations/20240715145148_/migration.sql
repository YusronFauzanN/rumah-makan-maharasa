/*
  Warnings:

  - You are about to drop the column `userId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropIndex
DROP INDEX "Customer_userId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_user_id_key" ON "Customer"("user_id");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
