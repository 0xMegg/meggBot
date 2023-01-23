/*
  Warnings:

  - You are about to drop the column `mesageId` on the `SavedChat` table. All the data in the column will be lost.
  - Added the required column `messageId` to the `SavedChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedChat" DROP COLUMN "mesageId",
ADD COLUMN     "messageId" TEXT NOT NULL;
