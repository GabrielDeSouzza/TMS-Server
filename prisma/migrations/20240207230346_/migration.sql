/*
  Warnings:

  - You are about to drop the `vehicle_type_contain_bodyworks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contract_number]` on the table `OutsourcedTransportCompanyContract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contract_number` to the `OutsourcedTransportCompanyContract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" DROP CONSTRAINT "vehicle_type_contain_bodyworks_bodywork_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" DROP CONSTRAINT "vehicle_type_contain_bodyworks_created_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" DROP CONSTRAINT "vehicle_type_contain_bodyworks_type_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" DROP CONSTRAINT "vehicle_type_contain_bodyworks_updated_by_fkey";

-- AlterTable
ALTER TABLE "OutsourcedTransportCompanyContract" ADD COLUMN     "contract_number" TEXT NOT NULL;

-- DropTable
DROP TABLE "vehicle_type_contain_bodyworks";

-- CreateTable
CREATE TABLE "_VehicleBodyworkToVehicleType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleBodyworkToVehicleType_AB_unique" ON "_VehicleBodyworkToVehicleType"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleBodyworkToVehicleType_B_index" ON "_VehicleBodyworkToVehicleType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "OutsourcedTransportCompanyContract_contract_number_key" ON "OutsourcedTransportCompanyContract"("contract_number");

-- AddForeignKey
ALTER TABLE "_VehicleBodyworkToVehicleType" ADD CONSTRAINT "_VehicleBodyworkToVehicleType_A_fkey" FOREIGN KEY ("A") REFERENCES "vehicle_bodyworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleBodyworkToVehicleType" ADD CONSTRAINT "_VehicleBodyworkToVehicleType_B_fkey" FOREIGN KEY ("B") REFERENCES "vehicle_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
