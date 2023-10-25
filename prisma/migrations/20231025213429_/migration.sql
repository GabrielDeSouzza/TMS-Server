/*
  Warnings:

  - The primary key for the `contract_outsourced_drivers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "contract_outsourced_drivers_outsourced_driver_id_key";

-- AlterTable
ALTER TABLE "contract_outsourced_drivers" DROP CONSTRAINT "contract_outsourced_drivers_pkey",
ADD CONSTRAINT "contract_outsourced_drivers_pkey" PRIMARY KEY ("id");
