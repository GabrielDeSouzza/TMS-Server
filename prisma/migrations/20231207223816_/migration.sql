/*
  Warnings:

  - You are about to drop the column `carrier_id` on the `ciots_for_legal_clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicle_id]` on the table `outsourced_vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `company_vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ciots_for_legal_clients" DROP COLUMN "carrier_id";

-- AlterTable
ALTER TABLE "company_vehicles" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contract_outsourced_drivers" ADD COLUMN     "outsourcedTransportCompanyDriverId" TEXT;

-- CreateTable
CREATE TABLE "outsourced_transport_vehicle" (
    "id" TEXT NOT NULL,
    "outsourced_company_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "outsourced_transport_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outsourcedT_transport_company_driver" (
    "id" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "cnh_category" "CNH" NOT NULL,
    "cnh_expiration" TIMESTAMP(3) NOT NULL,
    "course_mopp" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "natural_person_id" TEXT NOT NULL,
    "outsourced_transport_company_id" TEXT NOT NULL,

    CONSTRAINT "outsourcedT_transport_company_driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutsourcedTransportCompany" (
    "id" TEXT NOT NULL,
    "legal_person_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "OutsourcedTransportCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutsourcedTransportCompanyContract" (
    "id" TEXT NOT NULL,
    "outsourced_transport_company_id" TEXT NOT NULL,
    "carrier_company_id" TEXT NOT NULL,
    "legal_client_order_id" TEXT NOT NULL,

    CONSTRAINT "OutsourcedTransportCompanyContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_transport_vehicle_vehicle_id_key" ON "outsourced_transport_vehicle"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourcedT_transport_company_driver_cnh_key" ON "outsourcedT_transport_company_driver"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "outsourcedT_transport_company_driver_natural_person_id_key" ON "outsourcedT_transport_company_driver"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "OutsourcedTransportCompanyContract_legal_client_order_id_key" ON "OutsourcedTransportCompanyContract"("legal_client_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_vehicles_vehicle_id_key" ON "outsourced_vehicles"("vehicle_id");

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_outsourced_company_id_fkey" FOREIGN KEY ("outsourced_company_id") REFERENCES "OutsourcedTransportCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_outsourced_transport__fkey" FOREIGN KEY ("outsourced_transport_company_id") REFERENCES "OutsourcedTransportCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_outsourcedTransportCompanyDriv_fkey" FOREIGN KEY ("outsourcedTransportCompanyDriverId") REFERENCES "outsourcedT_transport_company_driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompany" ADD CONSTRAINT "OutsourcedTransportCompany_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompany" ADD CONSTRAINT "OutsourcedTransportCompany_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompany" ADD CONSTRAINT "OutsourcedTransportCompany_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_outsourced_transport_co_fkey" FOREIGN KEY ("outsourced_transport_company_id") REFERENCES "OutsourcedTransportCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_carrier_company_id_fkey" FOREIGN KEY ("carrier_company_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_legal_client_order_id_fkey" FOREIGN KEY ("legal_client_order_id") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
