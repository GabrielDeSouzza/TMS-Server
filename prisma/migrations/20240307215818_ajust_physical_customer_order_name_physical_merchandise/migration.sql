/*
  Warnings:

  - You are about to drop the column `physicalCustomerOrdermId` on the `physical_merchandise` table. All the data in the column will be lost.
  - Added the required column `physicalCustomerOrderId` to the `physical_merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "physical_merchandise" DROP CONSTRAINT "physical_merchandise_physicalCustomerOrdermId_fkey";

-- AlterTable
ALTER TABLE "physical_merchandise" DROP COLUMN "physicalCustomerOrdermId",
ADD COLUMN     "physicalCustomerOrderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "physical_merchandise" ADD CONSTRAINT "physical_merchandise_physicalCustomerOrderId_fkey" FOREIGN KEY ("physicalCustomerOrderId") REFERENCES "physical_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
