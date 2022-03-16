/*
  Warnings:

  - You are about to drop the column `filename` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `originalname` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "filename",
DROP COLUMN "originalname",
DROP COLUMN "size";
