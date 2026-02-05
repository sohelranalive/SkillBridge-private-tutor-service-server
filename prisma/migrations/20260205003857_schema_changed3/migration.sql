/*
  Warnings:

  - You are about to drop the column `ratings` on the `TutorProfile` table. All the data in the column will be lost.
  - Added the required column `ratings` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "ratings" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "ratings";
