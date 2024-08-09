-- CreateTable
CREATE TABLE "gift_rates" (
    "id" SERIAL NOT NULL,
    "giftId" VARCHAR(100) NOT NULL,
    "userId" VARCHAR(100) NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gift_rates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gift_rates" ADD CONSTRAINT "gift_rates_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_rates" ADD CONSTRAINT "gift_rates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
