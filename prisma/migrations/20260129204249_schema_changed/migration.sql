/*
  Warnings:

  - You are about to drop the `Subjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subjects" DROP CONSTRAINT "Subjects_subject_category_fkey";

-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "subjects" TEXT[];

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL;

-- DropTable
DROP TABLE "Subjects";
