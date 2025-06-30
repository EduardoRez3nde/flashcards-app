/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "tb_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "tb_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT,
    "codeContent" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "tb_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_categories_name_key" ON "tb_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_subjects_name_categoryId_key" ON "tb_subjects"("name", "categoryId");

-- AddForeignKey
ALTER TABLE "tb_subjects" ADD CONSTRAINT "tb_subjects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tb_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cards" ADD CONSTRAINT "tb_cards_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "tb_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
