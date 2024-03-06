/*
  Warnings:

  - A unique constraint covering the columns `[rntrc]` on the table `carrier_companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rntrc` to the `carrier_companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrier_companies" ADD COLUMN     "rntrc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "carrier_companies_rntrc_key" ON "carrier_companies"("rntrc");
