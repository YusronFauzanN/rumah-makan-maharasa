-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderDetail" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;