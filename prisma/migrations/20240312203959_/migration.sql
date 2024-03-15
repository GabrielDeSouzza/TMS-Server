/*
  Warnings:

  - You are about to drop the column `route_id` on the `order_processing_legal_client` table. All the data in the column will be lost.
  - You are about to drop the column `route_id` on the `order_processing_physical_customer` table. All the data in the column will be lost.
  - You are about to drop the column `legal_client_order_id` on the `routes_legal_client` table. All the data in the column will be lost.
  - You are about to drop the column `physicalCustomerOrderId` on the `routes_physical_customer` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_processing_legal_client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_processing_physical_customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_processing_id` to the `routes_legal_client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_processing_id` to the `routes_physical_customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_processing_legal_client" DROP CONSTRAINT "order_processing_legal_client_route_id_fkey";

-- DropForeignKey
ALTER TABLE "order_processing_physical_customer" DROP CONSTRAINT "order_processing_physical_customer_route_id_fkey";

-- DropForeignKey
ALTER TABLE "routes_legal_client" DROP CONSTRAINT "routes_legal_client_legal_client_order_id_fkey";

-- DropForeignKey
ALTER TABLE "routes_physical_customer" DROP CONSTRAINT "routes_physical_customer_physicalCustomerOrderId_fkey";

-- DropIndex
DROP INDEX "order_processing_legal_client_vehicle_id_key";

-- DropIndex
DROP INDEX "order_processing_physical_customer_vehicle_id_key";

-- AlterTable
ALTER TABLE "order_processing_legal_client" DROP COLUMN "route_id",
ADD COLUMN     "order_id" TEXT NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_processing_physical_customer" DROP COLUMN "route_id",
ADD COLUMN     "order_id" TEXT NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "routes_legal_client" DROP COLUMN "legal_client_order_id",
ADD COLUMN     "order_processing_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "routes_physical_customer" DROP COLUMN "physicalCustomerOrderId",
ADD COLUMN     "order_processing_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "routes_physical_customer" ADD CONSTRAINT "routes_physical_customer_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_processing_physical_customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_physical_customer" ADD CONSTRAINT "order_processing_physical_customer_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "physical_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes_legal_client" ADD CONSTRAINT "routes_legal_client_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_processing_legal_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_legal_client" ADD CONSTRAINT "order_processing_legal_client_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
