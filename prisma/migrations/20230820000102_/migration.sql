/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "CNH" AS ENUM ('A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "rntrc_expiration" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "capacity_max" DOUBLE PRECISION NOT NULL,
    "axles" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,

    CONSTRAINT "vehicle_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "vehicle_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bodywork" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "vehicle_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_bodyworks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "axles" INTEGER NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "vehicle_bodyworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_type_contain_bodyworks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "bodywork_id" TEXT NOT NULL,

    CONSTRAINT "vehicle_type_contain_bodyworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outsourced_vehicles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "order_processing_id" TEXT,

    CONSTRAINT "outsourced_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_vehicles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "order_processing_id" TEXT,

    CONSTRAINT "company_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outsourced_drivers" (
    "id" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "cnh_category" "CNH" NOT NULL,
    "cnh_expiration" TIMESTAMP(3) NOT NULL,
    "company_vehicle" BOOLEAN NOT NULL DEFAULT false,
    "course_mopp" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "outsourced_vehicle_id" TEXT NOT NULL,

    CONSTRAINT "outsourced_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_outsourced_drivers" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "contract_outsourced_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "own_drivers" (
    "id" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "cnh_category" "CNH" NOT NULL,
    "cnh_expiration" TIMESTAMP(3) NOT NULL,
    "company_vehicle" BOOLEAN NOT NULL DEFAULT false,
    "course_mopp" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "own_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "natural_people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL,
    "public_place" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "first_phone" TEXT NOT NULL,
    "second_phone" TEXT,
    "third_phone" TEXT,
    "email" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "natural_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_people" (
    "id" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "state_registration" TEXT NOT NULL,
    "corporate_name" TEXT NOT NULL,
    "public_place" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "first_phone" TEXT NOT NULL,
    "second_phone" TEXT,
    "third_phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "legal_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrier_companies" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "carrier_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_customers" (
    "id" TEXT NOT NULL,
    "branch" TEXT,
    "cpf" TEXT NOT NULL,
    "merchandiseId" TEXT,

    CONSTRAINT "physical_customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate_clients" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "corporate_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_contractors" (
    "id" TEXT NOT NULL,
    "branch" TEXT,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "physical_contractors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_contractors" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "legal_contractors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchandise" (
    "id" TEXT NOT NULL,
    "codMerchandise" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "order_id" TEXT NOT NULL,
    "contractor_cpf" TEXT,
    "contractor_cnpj" TEXT,
    "corporateClientId" TEXT,

    CONSTRAINT "merchandise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_orders" (
    "id" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "customer_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "public_place" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nature_invoice" TEXT NOT NULL,
    "invoice_total" DOUBLE PRECISION NOT NULL,
    "form_payment" TEXT NOT NULL,
    "additional_data" TEXT NOT NULL,
    "digital_signature" TEXT NOT NULL,
    "invoice_taxes" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "cpf_physicalcustomer" TEXT,
    "carrier_cnpj" TEXT NOT NULL,
    "corporate_cnpj" TEXT,
    "customerOrderId" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ciots" (
    "id" TEXT NOT NULL,
    "ciot" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT,
    "carrier_cnpj" TEXT NOT NULL,
    "corporate_cnpj" TEXT,
    "contractor_cnpj" TEXT,
    "contractor_cpf" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ciots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_processing" (
    "id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" INTEGER NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "order_processing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types_of_maintenances" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preventive" BOOLEAN NOT NULL,
    "corrective" BOOLEAN NOT NULL,

    CONSTRAINT "types_of_maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_companies" (
    "id" TEXT NOT NULL,
    "specialty_maintenance" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "maintenance_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "maintenance_company_cnpj" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "maintenance_process_id" TEXT NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "vehicles"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_brands_name_key" ON "vehicle_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_type_contain_bodyworks_bodywork_id_type_id_key" ON "vehicle_type_contain_bodyworks"("bodywork_id", "type_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_vehicles_vehicle_id_key" ON "company_vehicles"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_cnh_key" ON "outsourced_drivers"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_cpf_key" ON "outsourced_drivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_outsourced_vehicle_id_key" ON "outsourced_drivers"("outsourced_vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "contract_outsourced_drivers_cpf_key" ON "contract_outsourced_drivers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "own_drivers_cnh_key" ON "own_drivers"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "natural_people_cpf_key" ON "natural_people"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "natural_people_rg_key" ON "natural_people"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "legal_people_cnpj_key" ON "legal_people"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "legal_people_state_registration_key" ON "legal_people"("state_registration");

-- CreateIndex
CREATE UNIQUE INDEX "carrier_companies_cnpj_key" ON "carrier_companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customers_cpf_key" ON "physical_customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "corporate_clients_cnpj_key" ON "corporate_clients"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "physical_contractors_cpf_key" ON "physical_contractors"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "legal_contractors_cnpj_key" ON "legal_contractors"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "merchandise_codMerchandise_key" ON "merchandise"("codMerchandise");

-- CreateIndex
CREATE UNIQUE INDEX "customer_orders_order_key" ON "customer_orders"("order");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_digital_signature_key" ON "invoices"("digital_signature");

-- CreateIndex
CREATE UNIQUE INDEX "ciots_ciot_key" ON "ciots"("ciot");

-- CreateIndex
CREATE UNIQUE INDEX "order_processing_plate_key" ON "order_processing"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_companies_cnpj_key" ON "maintenance_companies"("cnpj");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicle_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_brands" ADD CONSTRAINT "vehicle_brands_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_bodyworks" ADD CONSTRAINT "vehicle_bodyworks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" ADD CONSTRAINT "vehicle_type_contain_bodyworks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" ADD CONSTRAINT "vehicle_type_contain_bodyworks_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_type_contain_bodyworks" ADD CONSTRAINT "vehicle_type_contain_bodyworks_bodywork_id_fkey" FOREIGN KEY ("bodywork_id") REFERENCES "vehicle_bodyworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_processing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_processing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "natural_people"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_outsourced_vehicle_id_fkey" FOREIGN KEY ("outsourced_vehicle_id") REFERENCES "outsourced_vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "outsourced_drivers"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "natural_people"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "legal_people"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_merchandiseId_fkey" FOREIGN KEY ("merchandiseId") REFERENCES "merchandise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "natural_people"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corporate_clients" ADD CONSTRAINT "corporate_clients_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "legal_people"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_contractors" ADD CONSTRAINT "physical_contractors_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "physical_customers"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_contractors" ADD CONSTRAINT "legal_contractors_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "corporate_clients"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise" ADD CONSTRAINT "merchandise_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise" ADD CONSTRAINT "merchandise_contractor_cpf_fkey" FOREIGN KEY ("contractor_cpf") REFERENCES "physical_contractors"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise" ADD CONSTRAINT "merchandise_contractor_cnpj_fkey" FOREIGN KEY ("contractor_cnpj") REFERENCES "legal_contractors"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchandise" ADD CONSTRAINT "merchandise_corporateClientId_fkey" FOREIGN KEY ("corporateClientId") REFERENCES "corporate_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_orders" ADD CONSTRAINT "customer_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_cpf_physicalcustomer_fkey" FOREIGN KEY ("cpf_physicalcustomer") REFERENCES "physical_customers"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_carrier_cnpj_fkey" FOREIGN KEY ("carrier_cnpj") REFERENCES "carrier_companies"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_corporate_cnpj_fkey" FOREIGN KEY ("corporate_cnpj") REFERENCES "corporate_clients"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerOrderId_fkey" FOREIGN KEY ("customerOrderId") REFERENCES "customer_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "physical_customers"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_carrier_cnpj_fkey" FOREIGN KEY ("carrier_cnpj") REFERENCES "carrier_companies"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_corporate_cnpj_fkey" FOREIGN KEY ("corporate_cnpj") REFERENCES "corporate_clients"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_contractor_cnpj_fkey" FOREIGN KEY ("contractor_cnpj") REFERENCES "legal_contractors"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots" ADD CONSTRAINT "ciots_contractor_cpf_fkey" FOREIGN KEY ("contractor_cpf") REFERENCES "physical_contractors"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_processing" ADD CONSTRAINT "order_processing_plate_fkey" FOREIGN KEY ("plate") REFERENCES "vehicles"("plate") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "legal_people"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_maintenance_company_cnpj_fkey" FOREIGN KEY ("maintenance_company_cnpj") REFERENCES "maintenance_companies"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_plate_fkey" FOREIGN KEY ("plate") REFERENCES "vehicles"("plate") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_maintenance_process_id_fkey" FOREIGN KEY ("maintenance_process_id") REFERENCES "types_of_maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
