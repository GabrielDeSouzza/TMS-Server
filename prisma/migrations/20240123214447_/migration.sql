/*
  Warnings:

  - A unique constraint covering the columns `[contract_number]` on the table `contract_outsourced_drivers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contract_number` to the `contract_outsourced_drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contract_outsourced_drivers" ADD COLUMN     "contract_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contract_outsourced_drivers_contract_number_key" ON "contract_outsourced_drivers"("contract_number");
