/*
  Warnings:

  - You are about to drop the column `cnpj` on the `carrier_companies` table. All the data in the column will be lost.
  - You are about to drop the column `plate` on the `order_processing` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `physical_customers` table. All the data in the column will be lost.
  - You are about to drop the column `merchandiseId` on the `physical_customers` table. All the data in the column will be lost.
  - You are about to drop the `ciots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `corporate_clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `legal_contractors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchandise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `physical_contractors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[legal_person_id]` on the table `carrier_companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicle_id]` on the table `order_processing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[natural_person_id]` on the table `physical_customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `legal_person_id` to the `carrier_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_id` to the `order_processing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natural_person_id` to the `physical_customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carrier_companies" DROP CONSTRAINT "carrier_companies_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_carrier_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_contractor_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_contractor_cpf_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_corporate_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_cpf_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_created_by_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "corporate_clients" DROP CONSTRAINT "corporate_clients_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "customer_orders" DROP CONSTRAINT "customer_orders_created_by_fkey";

-- DropForeignKey
ALTER TABLE "customer_orders" DROP CONSTRAINT "customer_orders_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_carrier_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_corporate_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_cpf_physicalcustomer_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_created_by_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customerOrderId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "legal_contractors" DROP CONSTRAINT "legal_contractors_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "merchandise" DROP CONSTRAINT "merchandise_contractor_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "merchandise" DROP CONSTRAINT "merchandise_contractor_cpf_fkey";

-- DropForeignKey
ALTER TABLE "merchandise" DROP CONSTRAINT "merchandise_corporateClientId_fkey";

-- DropForeignKey
ALTER TABLE "merchandise" DROP CONSTRAINT "merchandise_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_plate_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_route_id_fkey";

-- DropForeignKey
ALTER TABLE "physical_contractors" DROP CONSTRAINT "physical_contractors_cpf_fkey";

-- DropForeignKey
ALTER TABLE "physical_customers" DROP CONSTRAINT "physical_customers_cpf_fkey";

-- DropForeignKey
ALTER TABLE "physical_customers" DROP CONSTRAINT "physical_customers_merchandiseId_fkey";

-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_created_by_fkey";

-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_order_id_fkey";

-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_updated_by_fkey";

-- DropIndex
DROP INDEX "carrier_companies_cnpj_key";

-- DropIndex
DROP INDEX "order_processing_plate_key";

-- DropIndex
DROP INDEX "physical_customers_cpf_key";

-- AlterTable
ALTER TABLE "carrier_companies" DROP COLUMN "cnpj",
ADD COLUMN     "legal_person_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_processing" DROP COLUMN "plate",
ADD COLUMN     "vehicle_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_customers" DROP COLUMN "cpf",
DROP COLUMN "merchandiseId",
ADD COLUMN     "natural_person_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ciots";

-- DropTable
DROP TABLE "corporate_clients";

-- DropTable
DROP TABLE "customer_orders";

-- DropTable
DROP TABLE "invoices";

-- DropTable
DROP TABLE "legal_contractors";

-- DropTable
DROP TABLE "merchandise";

-- DropTable
DROP TABLE "physical_contractors";

-- DropTable
DROP TABLE "routes";

-- CreateTable
CREATE TABLE "physical_Contracts" (
    "id" TEXT NOT NULL,
    "physicalCustomerId" TEXT NOT NULL,

    CONSTRAINT "physical_Contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_merchandise" (
    "id" TEXT NOT NULL,
    "codMerchandise" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "physicalCustomerOrdermId" TEXT NOT NULL,

    CONSTRAINT "physical_merchandise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_orders" (
    "id" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "physical_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_physical_client" (
    "id" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nature_invoice" TEXT NOT NULL,
    "invoice_total" DOUBLE PRECISION NOT NULL,
    "form_payment" TEXT NOT NULL,
    "additional_data" TEXT NOT NULL,
    "digital_signature" TEXT NOT NULL,
    "invoice_taxes" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "carrierCompanyId" TEXT NOT NULL,
    "physicalCustomerOrderId" TEXT NOT NULL,

    CONSTRAINT "invoices_physical_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ciots_for_physical_clients" (
    "id" TEXT NOT NULL,
    "ciot" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carrier_id" TEXT NOT NULL,
    "physycalContractId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "ciots_for_physical_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_clients" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "legal_person_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "legal_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_Contracts" (
    "id" TEXT NOT NULL,
    "legal_client_id" TEXT NOT NULL,

    CONSTRAINT "legal_Contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_merchandise" (
    "id" TEXT NOT NULL,
    "codMerchandise" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "legalClientOrderId" TEXT NOT NULL,

    CONSTRAINT "legal_merchandise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_orders" (
    "id" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "legal_contract_id" TEXT NOT NULL,

    CONSTRAINT "legal_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_legal_client" (
    "id" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nature_invoice" TEXT NOT NULL,
    "invoice_total" DOUBLE PRECISION NOT NULL,
    "form_payment" TEXT NOT NULL,
    "additional_data" TEXT NOT NULL,
    "digital_signature" TEXT NOT NULL,
    "invoice_taxes" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "carrier_id" TEXT NOT NULL,
    "legalClientrOrderId" TEXT NOT NULL,

    CONSTRAINT "invoices_legal_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ciots_for_legal_clients" (
    "id" TEXT NOT NULL,
    "ciot" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carrier_id" TEXT NOT NULL,
    "legal_contract_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "ciots_for_legal_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lroutes" (
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
    "legalClientOrdermId" TEXT NOT NULL,
    "physicalCustomerOrderId" TEXT,

    CONSTRAINT "lroutes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "physical_Contracts_physicalCustomerId_key" ON "physical_Contracts"("physicalCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "physical_merchandise_codMerchandise_key" ON "physical_merchandise"("codMerchandise");

-- CreateIndex
CREATE UNIQUE INDEX "physical_orders_order_key" ON "physical_orders"("order");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_physical_client_digital_signature_key" ON "invoices_physical_client"("digital_signature");

-- CreateIndex
CREATE UNIQUE INDEX "ciots_for_physical_clients_ciot_key" ON "ciots_for_physical_clients"("ciot");

-- CreateIndex
CREATE UNIQUE INDEX "legal_clients_legal_person_id_key" ON "legal_clients"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "legal_Contracts_legal_client_id_key" ON "legal_Contracts"("legal_client_id");

-- CreateIndex
CREATE UNIQUE INDEX "legal_merchandise_codMerchandise_key" ON "legal_merchandise"("codMerchandise");

-- CreateIndex
CREATE UNIQUE INDEX "legal_orders_order_key" ON "legal_orders"("order");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_legal_client_digital_signature_key" ON "invoices_legal_client"("digital_signature");

-- CreateIndex
CREATE UNIQUE INDEX "ciots_for_legal_clients_ciot_key" ON "ciots_for_legal_clients"("ciot");

-- CreateIndex
CREATE UNIQUE INDEX "carrier_companies_legal_person_id_key" ON "carrier_companies"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_processing_vehicle_id_key" ON "order_processing"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customers_natural_person_id_key" ON "physical_customers"("natural_person_id");

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_Contracts" ADD CONSTRAINT "physical_Contracts_physicalCustomerId_fkey" FOREIGN KEY ("physicalCustomerId") REFERENCES "physical_customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_merchandise" ADD CONSTRAINT "physical_merchandise_physicalCustomerOrdermId_fkey" FOREIGN KEY ("physicalCustomerOrdermId") REFERENCES "physical_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "physical_Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_physical_client" ADD CONSTRAINT "invoices_physical_client_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_physical_client" ADD CONSTRAINT "invoices_physical_client_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_physical_client" ADD CONSTRAINT "invoices_physical_client_carrierCompanyId_fkey" FOREIGN KEY ("carrierCompanyId") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_physical_client" ADD CONSTRAINT "invoices_physical_client_physicalCustomerOrderId_fkey" FOREIGN KEY ("physicalCustomerOrderId") REFERENCES "physical_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_physical_clients" ADD CONSTRAINT "ciots_for_physical_clients_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_physical_clients" ADD CONSTRAINT "ciots_for_physical_clients_physycalContractId_fkey" FOREIGN KEY ("physycalContractId") REFERENCES "physical_Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_physical_clients" ADD CONSTRAINT "ciots_for_physical_clients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_physical_clients" ADD CONSTRAINT "ciots_for_physical_clients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_clients" ADD CONSTRAINT "legal_clients_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_clients" ADD CONSTRAINT "legal_clients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_clients" ADD CONSTRAINT "legal_clients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_legal_client_id_fkey" FOREIGN KEY ("legal_client_id") REFERENCES "legal_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_merchandise" ADD CONSTRAINT "legal_merchandise_legalClientOrderId_fkey" FOREIGN KEY ("legalClientOrderId") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_legal_contract_id_fkey" FOREIGN KEY ("legal_contract_id") REFERENCES "legal_Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_legal_client" ADD CONSTRAINT "invoices_legal_client_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_legal_client" ADD CONSTRAINT "invoices_legal_client_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_legal_client" ADD CONSTRAINT "invoices_legal_client_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_legal_client" ADD CONSTRAINT "invoices_legal_client_legalClientrOrderId_fkey" FOREIGN KEY ("legalClientrOrderId") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_legal_contract_id_fkey" FOREIGN KEY ("legal_contract_id") REFERENCES "legal_Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lroutes" ADD CONSTRAINT "lroutes_legalClientOrdermId_fkey" FOREIGN KEY ("legalClientOrdermId") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lroutes" ADD CONSTRAINT "lroutes_physicalCustomerOrderId_fkey" FOREIGN KEY ("physicalCustomerOrderId") REFERENCES "physical_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "lroutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
