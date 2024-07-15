/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `reservation_date` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservation_time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "reservation_date" TEXT NOT NULL,
ADD COLUMN     "reservation_time" TEXT NOT NULL;
