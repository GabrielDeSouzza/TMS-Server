/*
  Warnings:

  - You are about to drop the column `order_processing_id` on the `company_vehicles` table. All the data in the column will be lost.
  - You are about to drop the `order_processing_legal_client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_processing_physical_customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routes_legal_client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routes_physical_customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_vehicles" DROP CONSTRAINT "company_vehicles_orderProcessingLegalClientId_fkey";

-- DropForeignKey
ALTER TABLE "company_vehicles" DROP CONSTRAINT "company_vehicles_order_processing_id_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_legal_client" DROP CONSTRAINT "order_processing_legal_client_created_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_legal_client" DROP CONSTRAINT "order_processing_legal_client_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_legal_client" DROP CONSTRAINT "order_processing_legal_client_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_legal_client" DROP CONSTRAINT "order_processing_legal_client_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_physical_customer" DROP CONSTRAINT "fk_order";

-- DropForeignKey
ALTER TABLE "order_processing_physical_customer" DROP CONSTRAINT "order_processing_physical_customer_created_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_physical_customer" DROP CONSTRAINT "order_processing_physical_customer_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_physical_customer" DROP CONSTRAINT "order_processing_physical_customer_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "outsourced_vehicles" DROP CONSTRAINT "outsourced_vehicles_orderProcessingLegalClientId_fkey";

-- DropForeignKey
ALTER TABLE "outsourced_vehicles" DROP CONSTRAINT "outsourced_vehicles_order_processing_id_fkey";

-- DropForeignKey
ALTER TABLE "routes_legal_client" DROP CONSTRAINT "routes_legal_client_order_processing_id_fkey";

-- DropForeignKey
ALTER TABLE "routes_physical_customer" DROP CONSTRAINT "routes_physical_customer_order_processing_id_fkey";

-- AlterTable
ALTER TABLE "company_vehicles" DROP COLUMN "order_processing_id";

-- AlterTable
ALTER TABLE "legal_orders" ADD COLUMN     "completedOrdersId" TEXT,
ADD COLUMN     "order_processing_id" TEXT;

-- AlterTable
ALTER TABLE "physical_orders" ADD COLUMN     "completedOrdersId" TEXT,
ADD COLUMN     "order_processing_id" TEXT;

-- DropTable
DROP TABLE "order_processing_legal_client";

-- DropTable
DROP TABLE "order_processing_physical_customer";

-- DropTable
DROP TABLE "routes_legal_client";

-- DropTable
DROP TABLE "routes_physical_customer";

-- CreateTable
CREATE TABLE "ManifestLegalClinet" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "ManifestLegalClinet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_procesing" (
    "id" TEXT NOT NULL,
    "order_processing_number" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" DOUBLE PRECISION NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "order_procesing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completed_orders" (
    "id" TEXT NOT NULL,
    "order_processing_number" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" DOUBLE PRECISION NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "completed_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_procesing_order_processing_number_key" ON "order_procesing"("order_processing_number");

-- CreateIndex
CREATE UNIQUE INDEX "order_procesing_vehicle_id_key" ON "order_procesing"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "completed_orders_vehicle_id_key" ON "completed_orders"("vehicle_id");

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_procesing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_completedOrdersId_fkey" FOREIGN KEY ("completedOrdersId") REFERENCES "completed_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManifestLegalClinet" ADD CONSTRAINT "ManifestLegalClinet_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_procesing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_completedOrdersId_fkey" FOREIGN KEY ("completedOrdersId") REFERENCES "completed_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_procesing" ADD CONSTRAINT "order_procesing_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_orders" ADD CONSTRAINT "completed_orders_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
