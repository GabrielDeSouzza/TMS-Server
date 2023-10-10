/*
  Warnings:

  - You are about to drop the column `update_by` on the `carrier_companies` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `ciots` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `company_vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `contract_outsourced_drivers` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `customer_orders` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `maintenance_companies` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `order_processing` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `outsourced_drivers` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `outsourced_vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `own_drivers` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `physical_customers` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `routes` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `types_of_maintenances` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `vehicle_bodyworks` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `vehicle_brands` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `vehicle_models` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `vehicle_types` table. All the data in the column will be lost.
  - You are about to drop the column `update_by` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `updated_by` to the `carrier_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `ciots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `company_vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `contract_outsourced_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `customer_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `maintenance_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `order_processing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `outsourced_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `outsourced_vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `own_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `physical_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `types_of_maintenances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `vehicle_bodyworks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `vehicle_brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `vehicle_models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `vehicle_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carrier_companies" DROP CONSTRAINT "carrier_companies_update_by_fkey";

-- DropForeignKey
ALTER TABLE "ciots" DROP CONSTRAINT "ciots_update_by_fkey";

-- DropForeignKey
ALTER TABLE "company_vehicles" DROP CONSTRAINT "company_vehicles_update_by_fkey";

-- DropForeignKey
ALTER TABLE "contract_outsourced_drivers" DROP CONSTRAINT "contract_outsourced_drivers_update_by_fkey";

-- DropForeignKey
ALTER TABLE "customer_orders" DROP CONSTRAINT "customer_orders_update_by_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_update_by_fkey";

-- DropForeignKey
ALTER TABLE "maintenance" DROP CONSTRAINT "maintenance_update_by_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_companies" DROP CONSTRAINT "maintenance_companies_update_by_fkey";

-- DropForeignKey
ALTER TABLE "order_processing" DROP CONSTRAINT "order_processing_update_by_fkey";

-- DropForeignKey
ALTER TABLE "outsourced_drivers" DROP CONSTRAINT "outsourced_drivers_update_by_fkey";

-- DropForeignKey
ALTER TABLE "outsourced_vehicles" DROP CONSTRAINT "outsourced_vehicles_update_by_fkey";

-- DropForeignKey
ALTER TABLE "own_drivers" DROP CONSTRAINT "own_drivers_update_by_fkey";

-- DropForeignKey
ALTER TABLE "physical_customers" DROP CONSTRAINT "physical_customers_update_by_fkey";

-- DropForeignKey
ALTER TABLE "routes" DROP CONSTRAINT "routes_update_by_fkey";

-- DropForeignKey
ALTER TABLE "types_of_maintenances" DROP CONSTRAINT "types_of_maintenances_update_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_bodyworks" DROP CONSTRAINT "vehicle_bodyworks_update_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_brands" DROP CONSTRAINT "vehicle_brands_update_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_models" DROP CONSTRAINT "vehicle_models_update_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_types" DROP CONSTRAINT "vehicle_types_update_by_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_update_by_fkey";

-- AlterTable
ALTER TABLE "carrier_companies" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ciots" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "company_vehicles" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contract_outsourced_drivers" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customer_orders" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "maintenance_companies" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_processing" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_drivers" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_vehicles" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "own_drivers" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_customers" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "routes" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "types_of_maintenances" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_bodyworks" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_brands" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_models" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_types" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "update_by",
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_brands" ADD CONSTRAINT "vehicle_brands_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_bodyworks" ADD CONSTRAINT "vehicle_bodyworks_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_orders" ADD CONSTRAINT "customer_orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_of_maintenances" ADD CONSTRAINT "types_of_maintenances_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
