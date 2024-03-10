/*
  Warnings:

  - You are about to drop the `lroutes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_processing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_vehicles" DROP CONSTRAINT "company_vehicles_order_processing_id_fkey";

-- DropForeignKey
ALTER TABLE "lroutes" DROP CONSTRAINT "lroutes_legalClientOrdermId_fkey";

-- DropForeignKey
ALTER TABLE "lroutes" DROP CONSTRAINT "lroutes_physicalCustomerOrderId_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_created_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_route_id_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "outsourced_vehicles" DROP CONSTRAINT "outsourced_vehicles_order_processing_id_fkey";

-- AlterTable
ALTER TABLE "company_vehicles" ADD COLUMN     "orderProcessingLegalClientId" TEXT;

-- AlterTable
ALTER TABLE "outsourced_vehicles" ADD COLUMN     "orderProcessingLegalClientId" TEXT;

-- DropTable
DROP TABLE "lroutes";

-- DropTable
DROP TABLE "order_processing";

-- CreateTable
CREATE TABLE "routes_physical_customer" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "public_place" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physicalCustomerOrderId" TEXT NOT NULL,

    CONSTRAINT "routes_physical_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_processing_physical_customer" (
    "id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" INTEGER NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,

    CONSTRAINT "order_processing_physical_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes_legal_client" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "public_place" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "legal_client_order_id" TEXT NOT NULL,

    CONSTRAINT "routes_legal_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_processing_legal_client" (
    "id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" INTEGER NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,

    CONSTRAINT "order_processing_legal_client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_processing_physical_customer_vehicle_id_key" ON "order_processing_physical_customer"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_processing_legal_client_vehicle_id_key" ON "order_processing_legal_client"("vehicle_id");

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_processing_physical_customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_orderProcessingLegalClientId_fkey" FOREIGN KEY ("orderProcessingLegalClientId") REFERENCES "order_processing_legal_client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_processing_physical_customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_orderProcessingLegalClientId_fkey" FOREIGN KEY ("orderProcessingLegalClientId") REFERENCES "order_processing_legal_client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes_physical_customer" ADD CONSTRAINT "routes_physical_customer_physicalCustomerOrderId_fkey" FOREIGN KEY ("physicalCustomerOrderId") REFERENCES "physical_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_physical_customer" ADD CONSTRAINT "order_processing_physical_customer_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_physical_customer" ADD CONSTRAINT "order_processing_physical_customer_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_physical_customer" ADD CONSTRAINT "order_processing_physical_customer_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes_physical_customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_physical_customer" ADD CONSTRAINT "order_processing_physical_customer_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes_legal_client" ADD CONSTRAINT "routes_legal_client_legal_client_order_id_fkey" FOREIGN KEY ("legal_client_order_id") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_legal_client" ADD CONSTRAINT "order_processing_legal_client_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_legal_client" ADD CONSTRAINT "order_processing_legal_client_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_legal_client" ADD CONSTRAINT "order_processing_legal_client_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes_legal_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing_legal_client" ADD CONSTRAINT "order_processing_legal_client_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
