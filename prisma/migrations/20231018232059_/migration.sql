/*
  Warnings:

  - You are about to drop the column `created_at` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_created_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_updated_by_fkey";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by";
