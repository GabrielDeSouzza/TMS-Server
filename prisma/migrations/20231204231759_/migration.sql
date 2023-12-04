/*
  Warnings:

  - You are about to drop the column `carrier_id` on the `invoices_legal_client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoices_legal_client" DROP CONSTRAINT "invoices_legal_client_carrier_id_fkey";

-- AlterTable
ALTER TABLE "invoices_legal_client" DROP COLUMN "carrier_id";
