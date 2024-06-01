/*
  Warnings:

  - You are about to drop the column `order_processing_id` on the `outsourced_vehicles` table. All the data in the column will be lost.
  - You are about to drop the `completed_orders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `driver_id` to the `order_procesing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "completed_orders" DROP CONSTRAINT "completed_orders_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "legal_orders" DROP CONSTRAINT "legal_orders_completed_orders_id_fkey";

-- DropForeignKey
ALTER TABLE "physical_orders" DROP CONSTRAINT "physical_orders_completedOrdersId_fkey";

-- AlterTable
ALTER TABLE "order_procesing" ADD COLUMN     "driver_id" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "outsourced_vehicles" DROP COLUMN "order_processing_id";

-- DropTable
DROP TABLE "completed_orders";

-- CreateTable
CREATE TABLE "Manifest" (
    "id" TEXT NOT NULL,
    "order_processing_id" TEXT NOT NULL,
    "manifest_url" TEXT,
    "emission_date" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "num_protocol" TEXT NOT NULL,
    "acess_key" TEXT NOT NULL,

    CONSTRAINT "Manifest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_procesing" ADD CONSTRAINT "order_procesing_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "own_drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manifest" ADD CONSTRAINT "Manifest_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_procesing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
