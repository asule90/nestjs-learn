-- DropForeignKey
ALTER TABLE "gift_rates" DROP CONSTRAINT "gift_rates_giftId_fkey";

-- DropForeignKey
ALTER TABLE "gift_rates" DROP CONSTRAINT "gift_rates_userId_fkey";

-- AlterTable
ALTER TABLE "gift_rates" ALTER COLUMN "giftId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "gift_rates" ADD CONSTRAINT "gift_rates_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "gift"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_rates" ADD CONSTRAINT "gift_rates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
