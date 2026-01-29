/*
  Warnings:

  - You are about to drop the column `user_phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_status` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "user_phone",
DROP COLUMN "user_role",
DROP COLUMN "user_status",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
