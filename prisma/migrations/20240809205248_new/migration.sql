-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CLICK', 'CONVERSION');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateActivity" (
    "id" UUID NOT NULL,
    "type" "ActivityType" NOT NULL,
    "earntXp" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "affiliateLinkId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateLink" (
    "id" UUID NOT NULL,
    "link" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "offerId" UUID NOT NULL,

    CONSTRAINT "AffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" UUID NOT NULL,
    "baseXp" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiveawayJoins" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "giveawayId" UUID NOT NULL,

    CONSTRAINT "GiveawayJoins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Giveaway" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minLevel" INTEGER NOT NULL,
    "amountOfWinners" INTEGER NOT NULL,

    CONSTRAINT "Giveaway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GiveawayToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateLink_link_key" ON "AffiliateLink"("link");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateLink_userId_offerId_key" ON "AffiliateLink"("userId", "offerId");

-- CreateIndex
CREATE UNIQUE INDEX "GiveawayJoins_userId_giveawayId_key" ON "GiveawayJoins"("userId", "giveawayId");

-- CreateIndex
CREATE UNIQUE INDEX "_GiveawayToUser_AB_unique" ON "_GiveawayToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GiveawayToUser_B_index" ON "_GiveawayToUser"("B");

-- AddForeignKey
ALTER TABLE "AffiliateActivity" ADD CONSTRAINT "AffiliateActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateActivity" ADD CONSTRAINT "AffiliateActivity_affiliateLinkId_fkey" FOREIGN KEY ("affiliateLinkId") REFERENCES "AffiliateLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiveawayJoins" ADD CONSTRAINT "GiveawayJoins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiveawayJoins" ADD CONSTRAINT "GiveawayJoins_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveaway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GiveawayToUser" ADD CONSTRAINT "_GiveawayToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Giveaway"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GiveawayToUser" ADD CONSTRAINT "_GiveawayToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
