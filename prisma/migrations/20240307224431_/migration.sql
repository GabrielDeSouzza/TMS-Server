/*
  Warnings:

  - Added the required column `physical_customer_id` to the `physical_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "physical_orders" ADD COLUMN     "physical_customer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_physical_customer_id_fkey" FOREIGN KEY ("physical_customer_id") REFERENCES "physical_customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
