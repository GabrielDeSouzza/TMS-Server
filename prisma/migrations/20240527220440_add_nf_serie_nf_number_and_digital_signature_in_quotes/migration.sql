/*
  Warnings:

  - A unique constraint covering the columns `[digital_signature]` on the table `legal_client_quote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[digital_signature]` on the table `physical_customer_quote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `digital_signature` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nf_number` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nf_serie` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `digital_signature` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nf_number` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nf_serie` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "legal_client_quote" ADD COLUMN     "digital_signature" TEXT NOT NULL,
ADD COLUMN     "nf_number" TEXT NOT NULL,
ADD COLUMN     "nf_serie" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_customer_quote" ADD COLUMN     "digital_signature" TEXT NOT NULL,
ADD COLUMN     "nf_number" TEXT NOT NULL,
ADD COLUMN     "nf_serie" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "legal_client_quote_digital_signature_key" ON "legal_client_quote"("digital_signature");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customer_quote_digital_signature_key" ON "physical_customer_quote"("digital_signature");
