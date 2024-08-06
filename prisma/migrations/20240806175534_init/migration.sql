-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Giveaway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minLevel" INTEGER NOT NULL,
    "amountOfWinners" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "GiveawayJoins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "giveawayId" INTEGER NOT NULL,
    CONSTRAINT "GiveawayJoins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GiveawayJoins_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveaway" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GiveawayToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GiveawayToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Giveaway" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GiveawayToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GiveawayJoins_userId_giveawayId_key" ON "GiveawayJoins"("userId", "giveawayId");

-- CreateIndex
CREATE UNIQUE INDEX "_GiveawayToUser_AB_unique" ON "_GiveawayToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GiveawayToUser_B_index" ON "_GiveawayToUser"("B");
