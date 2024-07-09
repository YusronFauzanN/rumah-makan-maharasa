/*
  Warnings:

  - You are about to drop the column `table_id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[desk_id]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `desk_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_table_id_fkey";

-- DropIndex
DROP INDEX "Reservation_table_id_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "table_id",
ADD COLUMN     "desk_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Table";

-- CreateTable
CREATE TABLE "Desk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "detail" TEXT NOT NULL,

    CONSTRAINT "Desk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_desk_id_key" ON "Reservation"("desk_id");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_desk_id_fkey" FOREIGN KEY ("desk_id") REFERENCES "Desk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
