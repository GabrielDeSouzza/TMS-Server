-- CreateTable
CREATE TABLE "freight_expenses" (
    "id" TEXT NOT NULL,
    "expense_name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "legal_client_order_id" TEXT,
    "physical_customer_id" TEXT,

    CONSTRAINT "freight_expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "freight_expenses" ADD CONSTRAINT "legal_client_order_fk" FOREIGN KEY ("legal_client_order_id") REFERENCES "legal_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_expenses" ADD CONSTRAINT "freight_expenses_physical_customer_id_fkey" FOREIGN KEY ("physical_customer_id") REFERENCES "physical_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
