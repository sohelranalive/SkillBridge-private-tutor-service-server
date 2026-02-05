/*
  Warnings:

  - You are about to drop the column `reviewBy` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `tutor_reviews` on the `TutorProfile` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_reviewText_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "reviewBy",
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "tutor_reviews",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "education" TEXT[];

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
