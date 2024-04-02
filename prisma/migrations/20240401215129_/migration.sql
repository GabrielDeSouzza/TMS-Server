/*
  Warnings:

  - Added the required column `carrier_id` to the `legal_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrier_id` to the `physical_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "legal_orders" ADD COLUMN     "carrier_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_orders" ADD COLUMN     "carrier_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
