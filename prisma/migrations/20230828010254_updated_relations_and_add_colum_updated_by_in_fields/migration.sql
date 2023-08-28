/*
  Warnings:

  - Added the required column `update_by` to the `carrier_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `ciots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `ciots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `company_vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `contract_outsourced_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `customer_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `maintenance_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `maintenance_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `order_processing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `outsourced_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `outsourced_vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `own_drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `physical_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `physical_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `types_of_maintenances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `types_of_maintenances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `vehicle_bodyworks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `vehicle_brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `vehicle_models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `vehicle_type_contain_bodyworks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `vehicle_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_by` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrier_companies" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ciots" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "company_vehicles" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contract_outsourced_drivers" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customer_orders" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "maintenance" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "update_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "maintenance_companies" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "update_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "order_processing" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_drivers" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outsourced_vehicles" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "own_drivers" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "physical_customers" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "routes" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "types_of_maintenances" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "update_by" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "vehicle_bodyworks" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_brands" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_models" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_type_contain_bodyworks" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_types" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "update_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_brands" ADD CONSTRAINT "vehicle_brands_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_bodyworks" ADD CONSTRAINT "vehicle_bodyworks_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" ADD CONSTRAINT "vehicle_type_contain_bodyworks_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_orders" ADD CONSTRAINT "customer_orders_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_of_maintenances" ADD CONSTRAINT "types_of_maintenances_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_of_maintenances" ADD CONSTRAINT "types_of_maintenances_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
