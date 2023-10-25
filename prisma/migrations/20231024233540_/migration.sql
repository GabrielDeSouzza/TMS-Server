/*
  Warnings:

  - The primary key for the `contract_outsourced_drivers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "contract_outsourced_drivers" DROP CONSTRAINT "contract_outsourced_drivers_pkey",
ADD CONSTRAINT "contract_outsourced_drivers_pkey" PRIMARY KEY ("id", "outsourced_driver_id");
