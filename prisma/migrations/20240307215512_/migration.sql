/*
  Warnings:

  - You are about to drop the column `contractId` on the `physical_orders` table. All the data in the column will be lost.
  - You are about to drop the `ciots_for_physical_clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `physical_Contracts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ciots_for_physical_clients" DROP CONSTRAINT "ciots_for_physical_clients_carrier_id_fkey";

-- DropForeignKey
ALTER TABLE "ciots_for_physical_clients" DROP CONSTRAINT "ciots_for_physical_clients_created_by_fkey";

-- DropForeignKey
ALTER TABLE "ciots_for_physical_clients" DROP CONSTRAINT "ciots_for_physical_clients_physycalContractId_fkey";

-- DropForeignKey
ALTER TABLE "ciots_for_physical_clients" DROP CONSTRAINT "ciots_for_physical_clients_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "physical_Contracts" DROP CONSTRAINT "physical_Contracts_physicalCustomerId_fkey";

-- DropForeignKey
ALTER TABLE "physical_orders" DROP CONSTRAINT "physical_orders_contractId_fkey";

-- AlterTable
ALTER TABLE "physical_orders" DROP COLUMN "contractId";

-- DropTable
DROP TABLE "ciots_for_physical_clients";

-- DropTable
DROP TABLE "physical_Contracts";
