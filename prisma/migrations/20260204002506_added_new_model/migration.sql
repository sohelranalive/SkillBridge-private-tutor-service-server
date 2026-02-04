-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "reviewBy" TEXT NOT NULL,
    "reviewText" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "TutorProfile"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_reviewText_fkey" FOREIGN KEY ("reviewText") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
