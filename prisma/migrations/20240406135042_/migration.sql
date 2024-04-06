-- DropForeignKey
ALTER TABLE "maintenance_companies" DROP CONSTRAINT "maintenance_companies_legal_person_id_fkey";

-- AddForeignKey
ALTER TABLE "maintenance_companies" ADD CONSTRAINT "maintenance_companies_legal_person_id_fkey" FOREIGN KEY ("legal_person_id") REFERENCES "legal_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
