-- AlterTable
ALTER TABLE "legal_client_cte" ADD COLUMN     "autorization" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "physical_customer_cte" ADD COLUMN     "autorization" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
