/*
  Warnings:

  - You are about to drop the column `outsourcedTransportCompanyDriverId` on the `contract_outsourced_drivers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legal_person_id]` on the table `OutsourcedTransportCompany` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by` to the `OutsourcedTransportCompanyContract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `OutsourcedTransportCompanyContract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contract_outsourced_drivers" DROP CONSTRAINT "contract_outsourced_drivers_outsourcedTransportCompanyDriv_fkey";

-- AlterTable
ALTER TABLE "OutsourcedTransportCompanyContract" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contract_outsourced_drivers" DROP COLUMN "outsourcedTransportCompanyDriverId";

-- CreateIndex
CREATE UNIQUE INDEX "OutsourcedTransportCompany_legal_person_id_key" ON "OutsourcedTransportCompany"("legal_person_id");

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
