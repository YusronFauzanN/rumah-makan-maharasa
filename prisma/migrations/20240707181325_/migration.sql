/*
  Warnings:

  - Added the required column `desc` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
