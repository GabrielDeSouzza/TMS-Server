/*
  Warnings:

  - Changed the type of `cnh_category` on the `outsourcedT_transport_company_driver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cnh_category` on the `outsourced_drivers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cnh_category` on the `own_drivers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "outsourcedT_transport_company_driver" DROP COLUMN "cnh_category",
ADD COLUMN     "cnh_category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_drivers" DROP COLUMN "cnh_category",
ADD COLUMN     "cnh_category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "own_drivers" DROP COLUMN "cnh_category",
ADD COLUMN     "cnh_category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CNH";

-- DropEnum
DROP TYPE "Role";
