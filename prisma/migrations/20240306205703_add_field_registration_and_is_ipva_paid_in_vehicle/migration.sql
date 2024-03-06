/*
  Warnings:

  - Added the required column `is_ipva_paid` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "is_ipva_paid" BOOLEAN NOT NULL,
ADD COLUMN     "registration" TIMESTAMP(3) NOT NULL;
