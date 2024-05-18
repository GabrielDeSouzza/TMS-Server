/*
  Warnings:

  - A unique constraint covering the columns `[postal_cod,address_number]` on the table `adresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `icms_id` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_receivable` to the `legal_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_shipping_cost` to the `legal_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_tax_payable` to the `legal_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icms_id` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_receivable` to the `physical_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_shipping_cost` to the `physical_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_tax_payable` to the `physical_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "adresses_postal_cod_key";

-- AlterTable
ALTER TABLE "legal_client_quote" ADD COLUMN     "icms_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "legal_orders" ADD COLUMN     "total_receivable" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_shipping_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_tax_payable" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "physical_customer_quote" ADD COLUMN     "icms_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_orders" ADD COLUMN     "total_receivable" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_shipping_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_tax_payable" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "adresses_postal_cod_address_number_key" ON "adresses"("postal_cod", "address_number");

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_icms_id_fkey" FOREIGN KEY ("icms_id") REFERENCES "icms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_icms_id_fkey" FOREIGN KEY ("icms_id") REFERENCES "icms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
