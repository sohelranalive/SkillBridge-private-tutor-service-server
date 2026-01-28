/*
  Warnings:

  - The values [USER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tutor_availability` on the `TutorProfile` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'STUDENT', 'TUTOR');
ALTER TABLE "public"."user" ALTER COLUMN "user_role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "user_role" TYPE "UserRole_new" USING ("user_role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "user" ALTER COLUMN "user_role" SET DEFAULT 'STUDENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "TutorProfile" DROP CONSTRAINT "TutorProfile_tutor_category_fkey";

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "tutor_availability",
ALTER COLUMN "tutor_category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "user_role" SET DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "AvailabilitySlot" (
    "id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailabilitySlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AvailabilitySlot_tutor_id_start_time_end_time_idx" ON "AvailabilitySlot"("tutor_id", "start_time", "end_time");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_tutor_category_fkey" FOREIGN KEY ("tutor_category") REFERENCES "Categories"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilitySlot" ADD CONSTRAINT "AvailabilitySlot_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "TutorProfile"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
