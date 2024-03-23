/*
  Warnings:

  - You are about to drop the column `completedOrdersId` on the `legal_orders` table. All the data in the column will be lost.
  - You are about to drop the column `recipient_id` on the `legal_orders` table. All the data in the column will be lost.
  - You are about to drop the column `recipient_id` on the `physical_orders` table. All the data in the column will be lost.
  - You are about to drop the `ManifestLegalClinet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices_legal_client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices_physical_client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `legal_merchandise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `physical_merchandise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quote_table_id` to the `legal_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quote_table_id` to the `physical_orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ManifestLegalClinet" DROP CONSTRAINT "ManifestLegalClinet_order_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices_legal_client" DROP CONSTRAINT "invoices_legal_client_created_by_fkey";

-- DropForeignKey
ALTER TABLE "invoices_legal_client" DROP CONSTRAINT "invoices_legal_client_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "invoices_physical_client" DROP CONSTRAINT "invoices_physical_client_created_by_fkey";

-- DropForeignKey
ALTER TABLE "invoices_physical_client" DROP CONSTRAINT "invoices_physical_client_physical_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "invoices_physical_client" DROP CONSTRAINT "invoices_physical_client_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "legal_merchandise" DROP CONSTRAINT "legal_merchandise_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "legal_merchandise" DROP CONSTRAINT "legal_merchandise_legalClientOrderId_fkey";

-- DropForeignKey
ALTER TABLE "legal_orders" DROP CONSTRAINT "legal_orders_completedOrdersId_fkey";

-- DropForeignKey
ALTER TABLE "legal_orders" DROP CONSTRAINT "legal_orders_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "physical_merchandise" DROP CONSTRAINT "physical_merchandise_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "physical_merchandise" DROP CONSTRAINT "physical_merchandise_physicalCustomerOrderId_fkey";

-- DropForeignKey
ALTER TABLE "physical_orders" DROP CONSTRAINT "physical_orders_recipient_id_fkey";

-- AlterTable
ALTER TABLE "legal_orders" DROP COLUMN "completedOrdersId",
DROP COLUMN "recipient_id",
ADD COLUMN     "completed_orders_id" TEXT,
ADD COLUMN     "quote_table_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_orders" DROP COLUMN "recipient_id",
ADD COLUMN     "quote_table_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ManifestLegalClinet";

-- DropTable
DROP TABLE "invoices_legal_client";

-- DropTable
DROP TABLE "invoices_physical_client";

-- DropTable
DROP TABLE "legal_merchandise";

-- DropTable
DROP TABLE "physical_merchandise";

-- CreateTable
CREATE TABLE "physical_customer_quote" (
    "id" TEXT NOT NULL,
    "cod_quote" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "who_pays" TEXT NOT NULL,
    "postal_cod_origin" TEXT NOT NULL,
    "postal_cod_destiny" TEXT NOT NULL,
    "type_merchandise" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "nf_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "physical_customer_quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_customer_cte" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "access_key" TEXT NOT NULL,
    "type_cte" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "cte_number" TEXT NOT NULL,

    CONSTRAINT "physical_customer_cte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sender" (
    "id" TEXT NOT NULL,
    "legal_person_id" TEXT,
    "natural_person_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "sender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_client_cte" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "access_key" TEXT NOT NULL,
    "type_cte" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "cte_number" TEXT NOT NULL,

    CONSTRAINT "legal_client_cte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_client_quote" (
    "id" TEXT NOT NULL,
    "cod_quote" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "who_pays" TEXT NOT NULL,
    "postal_cod_origin" TEXT NOT NULL,
    "postal_cod_destiny" TEXT NOT NULL,
    "type_merchandise" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "nf_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "legal_client_quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "physical_customer_quote_postal_cod_destiny_postal_cod_origi_key" ON "physical_customer_quote"("postal_cod_destiny", "postal_cod_origin");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customer_cte_order_id_key" ON "physical_customer_cte"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_legal_person_id_key" ON "sender"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_natural_person_id_key" ON "sender"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "legal_client_cte_order_id_key" ON "legal_client_cte"("order_id");

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_quote_table_id_fkey" FOREIGN KEY ("quote_table_id") REFERENCES "physical_customer_quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_cte" ADD CONSTRAINT "physical_customer_cte_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "physical_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sender" ADD CONSTRAINT "sender_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sender" ADD CONSTRAINT "sender_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sender" ADD CONSTRAINT "sender_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sender" ADD CONSTRAINT "sender_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_cte" ADD CONSTRAINT "legal_client_cte_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_quote_table_id_fkey" FOREIGN KEY ("quote_table_id") REFERENCES "legal_client_quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_completed_orders_id_fkey" FOREIGN KEY ("completed_orders_id") REFERENCES "completed_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
