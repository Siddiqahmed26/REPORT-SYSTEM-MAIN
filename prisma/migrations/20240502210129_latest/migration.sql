/*
  Warnings:

  - The `coordinates` column on the `reports` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "coordinates",
ADD COLUMN     "coordinates" DOUBLE PRECISION[];
