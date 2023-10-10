/*
  Warnings:

  - You are about to drop the column `update_by` on the `vehicle_type_contain_bodyworks` table. All the data in the column will be lost.
  - Added the required column `updated_by` to the `vehicle_type_contain_bodyworks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" DROP CONSTRAINT "vehicle_type_contain_bodyworks_update_by_fkey";

-- AlterTable
ALTER TABLE "vehicle_type_contain_bodyworks" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" ADD CONSTRAINT "vehicle_type_contain_bodyworks_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
