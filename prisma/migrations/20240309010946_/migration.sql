/*
  Warnings:

  - A unique constraint covering the columns `[invoice_number]` on the table `invoices_physical_client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_number` to the `invoices_physical_client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices_physical_client" ADD COLUMN     "invoice_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_physical_client_invoice_number_key" ON "invoices_physical_client"("invoice_number");
