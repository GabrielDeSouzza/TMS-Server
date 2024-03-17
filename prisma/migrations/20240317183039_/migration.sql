/*
  Warnings:

  - A unique constraint covering the columns `[legal_person_id]` on the table `recipient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[natural_person_id]` on the table `recipient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipient_legal_person_id_key" ON "recipient"("legal_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipient_natural_person_id_key" ON "recipient"("natural_person_id");
