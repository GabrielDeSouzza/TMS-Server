/*
  Warnings:

  - You are about to drop the column `maintenance_company_cnpj` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `maintenance_companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legal_person_id]` on the table `maintenance_companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maintenance_company_id` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legal_person_id` to the `maintenance_companies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_maintenance_company_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_companies" DROP CONSTRAINT "maintenance_companies_cnpj_fkey";

-- DropIndex
DROP INDEX "maintenance_companies_cnpj_key";

-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "maintenance_company_cnpj",
ADD COLUMN     "maintenance_company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "maintenance_companies" DROP COLUMN "cnpj",
ADD COLUMN     "legal_person_id" TEXT NOT NULL,
ALTER COLUMN "specialty_maintenance" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_companies_legal_person_id_key" ON "maintenance_companies"("legal_person_id");

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_maintenance_company_id_fkey" FOREIGN KEY ("maintenance_company_id") REFERENCES "maintenance_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
