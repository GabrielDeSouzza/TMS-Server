-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "avatar_url" TEXT,
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
    "antt" TEXT NOT NULL,
    "registration" TIMESTAMP(3) NOT NULL,
    "is_ipva_paid" BOOLEAN NOT NULL,
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
    "capacity_per_axle" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
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
    "updated_by" TEXT NOT NULL,

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
    "updated_by" TEXT NOT NULL,

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
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "vehicle_bodyworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outsourced_vehicles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "order_processing_id" TEXT,
    "orderProcessingLegalClientId" TEXT,

    CONSTRAINT "outsourced_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_vehicles" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "orderProcessingLegalClientId" TEXT,

    CONSTRAINT "company_vehicles_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "outsourced_drivers" (
    "id" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "cnh_category" TEXT NOT NULL,
    "cnh_expiration" TIMESTAMP(3) NOT NULL,
    "course_mopp" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "natural_person_id" TEXT NOT NULL,
    "outsourced_vehicle_id" TEXT,
    "company_vehicle_id" TEXT,

    CONSTRAINT "outsourced_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outsourcedT_transport_company_driver" (
    "id" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "cnh_category" TEXT NOT NULL,
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
CREATE TABLE "contract_outsourced_drivers" (
    "id" TEXT NOT NULL,
    "contract_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "outsourced_driver_id" TEXT NOT NULL,

    CONSTRAINT "contract_outsourced_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "own_drivers" (
    "id" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "cnh_category" TEXT NOT NULL,
    "cnh_expiration" TIMESTAMP(3) NOT NULL,
    "company_vehicle" BOOLEAN NOT NULL DEFAULT false,
    "course_mopp" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "natural_person_id" TEXT NOT NULL,

    CONSTRAINT "own_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "natural_people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
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
    "nationality" TEXT NOT NULL,

    CONSTRAINT "natural_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_customers" (
    "id" TEXT NOT NULL,
    "branch" TEXT,
    "natural_person_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "physical_customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrier_companies" (
    "id" TEXT NOT NULL,
    "legal_person_id" TEXT NOT NULL,
    "rntrc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "carrier_companies_pkey" PRIMARY KEY ("id")
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
    "contract_number" TEXT NOT NULL,
    "outsourced_transport_company_id" TEXT NOT NULL,
    "carrier_company_id" TEXT NOT NULL,
    "legal_client_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "OutsourcedTransportCompanyContract_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "physical_orders" (
    "id" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "physical_customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "carrier_id" TEXT NOT NULL,
    "order_processing_id" TEXT,
    "completedOrdersId" TEXT,
    "quote_table_id" TEXT NOT NULL,

    CONSTRAINT "physical_orders_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "recipient" (
    "id" TEXT NOT NULL,
    "legal_person_id" TEXT,
    "natural_person_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "icms" (
    "id" TEXT NOT NULL,
    "state_orgin" TEXT NOT NULL,
    "recipient_state" TEXT NOT NULL,
    "aliquot" DOUBLE PRECISION NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "icms_pkey" PRIMARY KEY ("id")
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "legal_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_clients" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "legal_person_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "legal_clients_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "legal_Contracts" (
    "id" TEXT NOT NULL,
    "contract_number" TEXT NOT NULL,
    "legal_client_id" TEXT NOT NULL,
    "carrier_company_id" TEXT NOT NULL,
    "observations" VARCHAR(500),
    "delivery_conditions" VARCHAR(500) NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "legal_Contracts_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "legal_orders" (
    "id" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "legal_contract_id" TEXT NOT NULL,
    "quote_table_id" TEXT NOT NULL,
    "order_processing_id" TEXT,
    "carrier_id" TEXT NOT NULL,
    "completed_orders_id" TEXT,

    CONSTRAINT "legal_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ciots_for_legal_clients" (
    "id" TEXT NOT NULL,
    "ciot" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "legal_contract_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "ciots_for_legal_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_procesing" (
    "id" TEXT NOT NULL,
    "order_processing_number" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" DOUBLE PRECISION NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'created',
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "order_procesing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_incident" TIMESTAMP(3) NOT NULL,
    "order_process_id" TEXT NOT NULL,
    "date_resolved" TIMESTAMP(3),
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completed_orders" (
    "id" TEXT NOT NULL,
    "order_processing_number" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_spend_liters" DOUBLE PRECISION NOT NULL,
    "total_spending_money" DOUBLE PRECISION NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "completed_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freight_expenses" (
    "id" TEXT NOT NULL,
    "expense_name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "legal_client_order_id" TEXT,
    "physical_customer_id" TEXT,

    CONSTRAINT "freight_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types_of_maintenances" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeMaintenance" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "types_of_maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_companies" (
    "id" TEXT NOT NULL,
    "specialty_maintenance" TEXT,
    "legal_person_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "maintenance_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "maintenance_company_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "type_of_maintenance_id" TEXT NOT NULL,
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VehicleBodyworkToVehicleType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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
CREATE UNIQUE INDEX "vehicle_types_name_key" ON "vehicle_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_vehicles_vehicle_id_key" ON "outsourced_vehicles"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_vehicles_vehicle_id_key" ON "company_vehicles"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_transport_vehicle_vehicle_id_key" ON "outsourced_transport_vehicle"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_cnh_key" ON "outsourced_drivers"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_natural_person_id_key" ON "outsourced_drivers"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_outsourced_vehicle_id_key" ON "outsourced_drivers"("outsourced_vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourced_drivers_company_vehicle_id_key" ON "outsourced_drivers"("company_vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "outsourcedT_transport_company_driver_cnh_key" ON "outsourcedT_transport_company_driver"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "outsourcedT_transport_company_driver_natural_person_id_key" ON "outsourcedT_transport_company_driver"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "contract_outsourced_drivers_contract_number_key" ON "contract_outsourced_drivers"("contract_number");

-- CreateIndex
CREATE UNIQUE INDEX "own_drivers_cnh_key" ON "own_drivers"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "natural_people_cpf_key" ON "natural_people"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "natural_people_rg_key" ON "natural_people"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customers_natural_person_id_key" ON "physical_customers"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "carrier_companies_legal_person_id_key" ON "carrier_companies"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "carrier_companies_rntrc_key" ON "carrier_companies"("rntrc");

-- CreateIndex
CREATE UNIQUE INDEX "OutsourcedTransportCompany_legal_person_id_key" ON "OutsourcedTransportCompany"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "OutsourcedTransportCompanyContract_contract_number_key" ON "OutsourcedTransportCompanyContract"("contract_number");

-- CreateIndex
CREATE UNIQUE INDEX "OutsourcedTransportCompanyContract_legal_client_order_id_key" ON "OutsourcedTransportCompanyContract"("legal_client_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customer_quote_postal_cod_destiny_postal_cod_origi_key" ON "physical_customer_quote"("postal_cod_destiny", "postal_cod_origin");

-- CreateIndex
CREATE UNIQUE INDEX "physical_orders_order_key" ON "physical_orders"("order");

-- CreateIndex
CREATE UNIQUE INDEX "physical_customer_cte_order_id_key" ON "physical_customer_cte"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_legal_person_id_key" ON "sender"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_natural_person_id_key" ON "sender"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipient_legal_person_id_key" ON "recipient"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipient_natural_person_id_key" ON "recipient"("natural_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "icms_state_orgin_recipient_state_key" ON "icms"("state_orgin", "recipient_state");

-- CreateIndex
CREATE UNIQUE INDEX "legal_people_cnpj_key" ON "legal_people"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "legal_people_state_registration_key" ON "legal_people"("state_registration");

-- CreateIndex
CREATE UNIQUE INDEX "legal_clients_legal_person_id_key" ON "legal_clients"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "legal_client_cte_order_id_key" ON "legal_client_cte"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "legal_Contracts_contract_number_key" ON "legal_Contracts"("contract_number");

-- CreateIndex
CREATE UNIQUE INDEX "legal_orders_order_key" ON "legal_orders"("order");

-- CreateIndex
CREATE UNIQUE INDEX "ciots_for_legal_clients_ciot_key" ON "ciots_for_legal_clients"("ciot");

-- CreateIndex
CREATE UNIQUE INDEX "order_procesing_order_processing_number_key" ON "order_procesing"("order_processing_number");

-- CreateIndex
CREATE UNIQUE INDEX "order_procesing_vehicle_id_key" ON "order_procesing"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "completed_orders_vehicle_id_key" ON "completed_orders"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "types_of_maintenances_description_typeMaintenance_key" ON "types_of_maintenances"("description", "typeMaintenance");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_companies_legal_person_id_key" ON "maintenance_companies"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleBodyworkToVehicleType_AB_unique" ON "_VehicleBodyworkToVehicleType"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleBodyworkToVehicleType_B_index" ON "_VehicleBodyworkToVehicleType"("B");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicle_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_brands" ADD CONSTRAINT "vehicle_brands_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_brands" ADD CONSTRAINT "vehicle_brands_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_bodyworks" ADD CONSTRAINT "vehicle_bodyworks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_bodyworks" ADD CONSTRAINT "vehicle_bodyworks_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_vehicles" ADD CONSTRAINT "outsourced_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_vehicles" ADD CONSTRAINT "company_vehicles_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_outsourced_company_id_fkey" FOREIGN KEY ("outsourced_company_id") REFERENCES "OutsourcedTransportCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_transport_vehicle" ADD CONSTRAINT "outsourced_transport_vehicle_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_outsourced_vehicle_id_fkey" FOREIGN KEY ("outsourced_vehicle_id") REFERENCES "outsourced_vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourced_drivers" ADD CONSTRAINT "outsourced_drivers_company_vehicle_id_fkey" FOREIGN KEY ("company_vehicle_id") REFERENCES "company_vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outsourcedT_transport_company_driver" ADD CONSTRAINT "outsourcedT_transport_company_driver_outsourced_transport__fkey" FOREIGN KEY ("outsourced_transport_company_id") REFERENCES "OutsourcedTransportCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_outsourced_drivers" ADD CONSTRAINT "contract_outsourced_drivers_outsourced_driver_id_fkey" FOREIGN KEY ("outsourced_driver_id") REFERENCES "outsourced_drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customers" ADD CONSTRAINT "physical_customers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrier_companies" ADD CONSTRAINT "carrier_companies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutsourcedTransportCompanyContract" ADD CONSTRAINT "OutsourcedTransportCompanyContract_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_customer_quote" ADD CONSTRAINT "physical_customer_quote_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_physical_customer_id_fkey" FOREIGN KEY ("physical_customer_id") REFERENCES "physical_customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_procesing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_orders" ADD CONSTRAINT "physical_orders_completedOrdersId_fkey" FOREIGN KEY ("completedOrdersId") REFERENCES "completed_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "icms" ADD CONSTRAINT "icms_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "icms" ADD CONSTRAINT "icms_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_clients" ADD CONSTRAINT "legal_clients_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_clients" ADD CONSTRAINT "legal_clients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_clients" ADD CONSTRAINT "legal_clients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_cte" ADD CONSTRAINT "legal_client_cte_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "legal_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_legal_client_id_fkey" FOREIGN KEY ("legal_client_id") REFERENCES "legal_clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_carrier_company_id_fkey" FOREIGN KEY ("carrier_company_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_Contracts" ADD CONSTRAINT "legal_Contracts_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_client_quote" ADD CONSTRAINT "legal_client_quote_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_legal_contract_id_fkey" FOREIGN KEY ("legal_contract_id") REFERENCES "legal_Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_quote_table_id_fkey" FOREIGN KEY ("quote_table_id") REFERENCES "legal_client_quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_order_processing_id_fkey" FOREIGN KEY ("order_processing_id") REFERENCES "order_procesing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_orders" ADD CONSTRAINT "legal_orders_completed_orders_id_fkey" FOREIGN KEY ("completed_orders_id") REFERENCES "completed_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_legal_contract_id_fkey" FOREIGN KEY ("legal_contract_id") REFERENCES "legal_Contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciots_for_legal_clients" ADD CONSTRAINT "ciots_for_legal_clients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_procesing" ADD CONSTRAINT "order_procesing_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_order_process_id_fkey" FOREIGN KEY ("order_process_id") REFERENCES "order_procesing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_orders" ADD CONSTRAINT "completed_orders_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_expenses" ADD CONSTRAINT "legal_client_order_fk" FOREIGN KEY ("legal_client_order_id") REFERENCES "legal_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_expenses" ADD CONSTRAINT "freight_expenses_physical_customer_id_fkey" FOREIGN KEY ("physical_customer_id") REFERENCES "physical_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_of_maintenances" ADD CONSTRAINT "types_of_maintenances_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_of_maintenances" ADD CONSTRAINT "types_of_maintenances_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_maintenance_company_id_fkey" FOREIGN KEY ("maintenance_company_id") REFERENCES "maintenance_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_type_of_maintenance_id_fkey" FOREIGN KEY ("type_of_maintenance_id") REFERENCES "types_of_maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleBodyworkToVehicleType" ADD CONSTRAINT "_VehicleBodyworkToVehicleType_A_fkey" FOREIGN KEY ("A") REFERENCES "vehicle_bodyworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleBodyworkToVehicleType" ADD CONSTRAINT "_VehicleBodyworkToVehicleType_B_fkey" FOREIGN KEY ("B") REFERENCES "vehicle_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
