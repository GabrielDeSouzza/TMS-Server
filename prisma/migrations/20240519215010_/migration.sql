/*
  Warnings:

  - You are about to drop the column `nature_service` on the `legal_client_quote` table. All the data in the column will be lost.
  - You are about to drop the column `type_cte` on the `legal_client_quote` table. All the data in the column will be lost.
  - You are about to drop the column `natute_service` on the `physical_customer_quote` table. All the data in the column will be lost.
  - You are about to drop the column `type_cte` on the `physical_customer_quote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "legal_client_quote" DROP COLUMN "nature_service",
DROP COLUMN "type_cte";

-- AlterTable
ALTER TABLE "physical_customer_quote" DROP COLUMN "natute_service",
DROP COLUMN "type_cte";
