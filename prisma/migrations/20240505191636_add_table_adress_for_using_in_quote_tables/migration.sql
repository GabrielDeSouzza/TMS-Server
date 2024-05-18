/*
  Warnings:

  - You are about to drop the column `postal_cod_destiny` on the `legal_client_quote` table. All the data in the column will be lost.
  - You are about to drop the column `postal_cod_origin` on the `legal_client_quote` table. All the data in the column will be lost.
  - You are about to drop the column `postal_cod_destiny` on the `physical_customer_quote` table. All the data in the column will be lost.
  - You are about to drop the column `postal_cod_origin` on the `physical_customer_quote` table. All the data in the column will be lost.
  - Added the required column `adress_destiny_id` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress_origin_id` to the `legal_client_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress_destiny_id` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress_origin_id` to the `physical_customer_quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "physical_customer_quote_postal_cod_destiny_postal_cod_origi_key";

-- AlterTable
ALTER TABLE "legal_client_quote" DROP COLUMN "postal_cod_destiny",
DROP COLUMN "postal_cod_origin",
ADD COLUMN     "adress_destiny_id" TEXT NOT NULL,
ADD COLUMN     "adress_origin_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_customer_quote" DROP COLUMN "postal_cod_destiny",
DROP COLUMN "postal_cod_origin",
ADD COLUMN     "adress_destiny_id" TEXT NOT NULL,
ADD COLUMN     "adress_origin_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "adresses" (
    "id" TEXT NOT NULL,
    "postal_cod" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adresses_postal_cod_key" ON "adresses"("postal_cod");

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_adress_origin_id_fkey" FOREIGN KEY ("adress_origin_id") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_adress_destiny_id_fkey" FOREIGN KEY ("adress_destiny_id") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_adress_origin_id_fkey" FOREIGN KEY ("adress_origin_id") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_adress_destiny_id_fkey" FOREIGN KEY ("adress_destiny_id") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
