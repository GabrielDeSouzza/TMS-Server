/*
  Warnings:

  - You are about to drop the column `company_vehicle` on the `outsourced_drivers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[company_vehicle_id]` on the table `outsourced_drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "outsourced_drivers" DROP CONSTRAINT "outsourced_drivers_outsourced_vehicle_id_fkey";

-- AlterTable
ALTER TABLE "outsourced_drivers" DROP COLUMN "company_vehicle",
ADD COLUMN     "company_vehicle_id" TEXT,
ALTER COLUMN "outsourced_vehicle_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_company_vehicle_id_key" ON "outsourced_drivers"("company_vehicle_id");

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_outsourced_vehicle_id_fkey" FOREIGN KEY ("outsourced_vehicle_id") REFERENCES "outsourced_vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_company_vehicle_id_fkey" FOREIGN KEY ("company_vehicle_id") REFERENCES "company_vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
