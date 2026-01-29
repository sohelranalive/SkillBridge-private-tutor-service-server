/*
  Warnings:

  - You are about to drop the `BookingSlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookingSlot" DROP CONSTRAINT "BookingSlot_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingSlot" DROP CONSTRAINT "BookingSlot_student_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingSlot" DROP CONSTRAINT "BookingSlot_tutor_id_fkey";

-- DropTable
DROP TABLE "BookingSlot";
