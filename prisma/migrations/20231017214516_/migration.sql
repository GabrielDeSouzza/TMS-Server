/*
  Warnings:

  - You are about to drop the column `cpf` on the `own_drivers` table. All the data in the column will be lost.
  - Added the required column `natural_person_id` to the `own_drivers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "own_drivers" DROP CONSTRAINT "own_drivers_cpf_fkey";

-- AlterTable
ALTER TABLE "natural_people" ALTER COLUMN "rg" SET DATA TYPE TEXT,
ALTER COLUMN "cep" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "own_drivers" DROP COLUMN "cpf",
ADD COLUMN     "natural_person_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "own_drivers" ADD CONSTRAINT "own_drivers_natural_person_id_fkey" FOREIGN KEY ("natural_person_id") REFERENCES "natural_people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
