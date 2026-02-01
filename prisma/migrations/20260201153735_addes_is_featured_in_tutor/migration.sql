-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "rating" INTEGER;
