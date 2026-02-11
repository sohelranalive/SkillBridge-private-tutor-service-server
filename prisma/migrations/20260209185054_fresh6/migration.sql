/*
  Warnings:

  - A unique constraint covering the columns `[tutor_id,start_time,end_time,subject]` on the table `AvailabilitySlot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AvailabilitySlot" ALTER COLUMN "subject" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilitySlot_tutor_id_start_time_end_time_subject_key" ON "AvailabilitySlot"("tutor_id", "start_time", "end_time", "subject");
