/*
  Warnings:

  - You are about to drop the column `booking_slot` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "booking_slot";

-- CreateTable
CREATE TABLE "BookingSlot" (
    "id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "booking_id" TEXT NOT NULL,

    CONSTRAINT "BookingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingSlot_tutor_id_start_time_end_time_idx" ON "BookingSlot"("tutor_id", "start_time", "end_time");

-- AddForeignKey
ALTER TABLE "BookingSlot" ADD CONSTRAINT "BookingSlot_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSlot" ADD CONSTRAINT "BookingSlot_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "TutorProfile"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSlot" ADD CONSTRAINT "BookingSlot_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
