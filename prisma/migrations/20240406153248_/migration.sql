/*
  Warnings:

  - You are about to drop the column `maintenance_process_id` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `plate` on the `maintenance` table. All the data in the column will be lost.
  - Added the required column `type_of_maintenance_id` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_id` to the `maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_maintenance_process_id_fkey";

-- DropForeignKey
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_plate_fkey";

-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "maintenance_process_id",
DROP COLUMN "plate",
ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "type_of_maintenance_id" TEXT NOT NULL,
ADD COLUMN     "vehicle_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_type_of_maintenance_id_fkey" FOREIGN KEY ("type_of_maintenance_id") REFERENCES "types_of_maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
