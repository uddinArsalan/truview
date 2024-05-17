/*
  Warnings:

  - You are about to drop the column `description` on the `ImageMetadata` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `ImageMetadata` table without a default value. This is not possible if the table is not empty.
  - Made the column `post_id` on table `ImageMetadata` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ImageMetadata" DROP CONSTRAINT "ImageMetadata_post_id_fkey";

-- AlterTable
ALTER TABLE "ImageMetadata" DROP COLUMN "description",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "ImageMetadata" ADD CONSTRAINT "ImageMetadata_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
