/*
  Warnings:

  - Changed the type of `malId` on the `Favourite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `malId` on the `WatchLater` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "malId",
ADD COLUMN     "malId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WatchLater" DROP COLUMN "malId",
ADD COLUMN     "malId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_malId_userId_key" ON "Favourite"("malId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchLater_malId_userId_key" ON "WatchLater"("malId", "userId");
