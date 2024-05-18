/*
  Warnings:

  - You are about to drop the column `orderProcessingLegalClientId` on the `company_vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `orderProcessingLegalClientId` on the `outsourced_vehicles` table. All the data in the column will be lost.
  - Added the required column `form_payment` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind_service` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nature_service` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_cte` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_payment` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind_service` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natute_service` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_cte` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_vehicles" DROP COLUMN "orderProcessingLegalClientId";

-- AlterTable
ALTER TABLE "legal_client_quote" ADD COLUMN     "form_payment" TEXT NOT NULL,
ADD COLUMN     "kind_service" TEXT NOT NULL,
ADD COLUMN     "nature_service" TEXT NOT NULL,
ADD COLUMN     "type_cte" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_vehicles" DROP COLUMN "orderProcessingLegalClientId";

-- AlterTable
ALTER TABLE "physical_customer_quote" ADD COLUMN     "form_payment" TEXT NOT NULL,
ADD COLUMN     "kind_service" TEXT NOT NULL,
ADD COLUMN     "natute_service" TEXT NOT NULL,
ADD COLUMN     "type_cte" TEXT NOT NULL;
