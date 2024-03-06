/*
  Warnings:

  - You are about to drop the column `rntrc_expiration` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `antt` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "rntrc_expiration",
ADD COLUMN     "antt" TEXT NOT NULL;
