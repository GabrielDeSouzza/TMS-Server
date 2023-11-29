/*
  Warnings:

  - A unique constraint covering the columns `[contract_number]` on the table `legal_Contracts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carrier_company_id` to the `legal_Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_number` to the `legal_Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `legal_Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_conditions` to the `legal_Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effective_date` to the `legal_Contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `legal_Contracts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "legal_Contracts_legal_client_id_key";

-- AlterTable
ALTER TABLE "legal_Contracts" ADD COLUMN     "carrier_company_id" TEXT NOT NULL,
ADD COLUMN     "contract_number" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "delivery_conditions" VARCHAR(500) NOT NULL,
ADD COLUMN     "effective_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "observations" VARCHAR(500),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "legal_Contracts_contract_number_key" ON "legal_Contracts"("contract_number");

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_carrier_company_id_fkey" FOREIGN KEY ("carrier_company_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
