-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT[];
