/*
  Warnings:

  - A unique constraint covering the columns `[student_id,availability_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_student_id_availability_id_key" ON "Booking"("student_id", "availability_id");
