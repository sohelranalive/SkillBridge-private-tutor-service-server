-- CreateTable
CREATE TABLE "Subjects" (
    "subject_id" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "subject_category" TEXT NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("subject_id")
);

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_subject_category_fkey" FOREIGN KEY ("subject_category") REFERENCES "Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
