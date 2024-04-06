/*
  Warnings:

  - You are about to drop the column `corrective` on the `types_of_maintenances` table. All the data in the column will be lost.
  - You are about to drop the column `preventive` on the `types_of_maintenances` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description,typeMaintenance]` on the table `types_of_maintenances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `typeMaintenance` to the `types_of_maintenances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "types_of_maintenances" DROP COLUMN "corrective",
DROP COLUMN "preventive",
ADD COLUMN     "typeMaintenance" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "types_of_maintenances_description_typeMaintenance_key" ON "types_of_maintenances"("description", "typeMaintenance");
