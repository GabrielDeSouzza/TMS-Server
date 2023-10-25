/*
  Warnings:

  - You are about to drop the column `cpf` on the `outsourced_drivers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[outsourced_driver_id]` on the table `contract_outsourced_drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[natural_person_id]` on the table `outsourced_drivers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `outsourced_driver_id` to the `contract_outsourced_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natural_person_id` to the `outsourced_drivers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contract_outsourced_drivers" DROP CONSTRAINT "contract_outsourced_drivers_cpf_fkey";

-- DropForeignKey
ALTER TABLE "outsourced_drivers" DROP CONSTRAINT "outsourced_drivers_cpf_fkey";

-- DropIndex
DROP INDEX "contract_outsourced_drivers_cpf_key";

-- DropIndex
DROP INDEX "outsourced_drivers_cpf_key";

-- AlterTable
ALTER TABLE "contract_outsourced_drivers" ADD COLUMN     "outsourced_driver_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_drivers" DROP COLUMN "cpf",
ADD COLUMN     "natural_person_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contract_outsourced_drivers_outsourced_driver_id_key" ON "contract_outsourced_drivers"("outsourced_driver_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_natural_person_id_key" ON "outsourced_drivers"("natural_person_id");

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_outsourced_driver_id_fkey" FOREIGN KEY ("outsourced_driver_id") REFERENCES "outsourced_drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
