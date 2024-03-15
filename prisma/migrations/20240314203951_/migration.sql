/*
  Warnings:

  - You are about to drop the column `legalClientrOrderId` on the `invoices_legal_client` table. All the data in the column will be lost.
  - You are about to drop the column `carrierCompanyId` on the `invoices_physical_client` table. All the data in the column will be lost.
  - You are about to drop the column `physicalCustomerOrderId` on the `invoices_physical_client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legalClientOrderId]` on the table `legal_merchandise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoice_id]` on the table `legal_merchandise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `order_processing_physical_customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[physicalCustomerOrderId]` on the table `physical_merchandise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoice_id]` on the table `physical_merchandise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `physical_customer_id` to the `invoices_physical_client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_id` to the `legal_merchandise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_id` to the `physical_merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices_legal_client" DROP CONSTRAINT "invoices_legal_client_legalClientrOrderId_fkey";

-- DropForeignKey
ALTER TABLE "invoices_physical_client" DROP CONSTRAINT "invoices_physical_client_carrierCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "invoices_physical_client" DROP CONSTRAINT "invoices_physical_client_physicalCustomerOrderId_fkey";

-- AlterTable
ALTER TABLE "invoices_legal_client" DROP COLUMN "legalClientrOrderId";

-- AlterTable
ALTER TABLE "invoices_physical_client" DROP COLUMN "carrierCompanyId",
DROP COLUMN "physicalCustomerOrderId",
ADD COLUMN     "physical_customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "legal_merchandise" ADD COLUMN     "invoice_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_merchandise" ADD COLUMN     "invoice_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "legal_merchandise_legalClientOrderId_key" ON "legal_merchandise"("legalClientOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "legal_merchandise_invoice_id_key" ON "legal_merchandise"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_processing_physical_customer_order_id_key" ON "order_processing_physical_customer"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "physical_merchandise_physicalCustomerOrderId_key" ON "physical_merchandise"("physicalCustomerOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "physical_merchandise_invoice_id_key" ON "physical_merchandise"("invoice_id");

-- RenameForeignKey
ALTER TABLE "order_processing_physical_customer" RENAME CONSTRAINT "order_processing_physical_customer_order_id_fkey" TO "fk_order";

-- AddForeignKey
ALTER TABLE "invoices_physical_client" ADD CONSTRAINT "invoices_physical_client_physical_customer_id_fkey" FOREIGN KEY ("physical_customer_id") REFERENCES "physical_customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_merchandise" ADD CONSTRAINT "physical_merchandise_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices_physical_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_merchandise" ADD CONSTRAINT "legal_merchandise_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices_legal_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
