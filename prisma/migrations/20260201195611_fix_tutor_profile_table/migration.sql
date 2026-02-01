/*
  Warnings:

  - You are about to drop the column `rating` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `tutor_ratings` on the `TutorProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "rating",
DROP COLUMN "tutor_ratings",
ADD COLUMN     "ratings" INTEGER,
ADD COLUMN     "tutor_reviews" TEXT;
