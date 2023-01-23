-- CreateTable
CREATE TABLE "SavedChat" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "mesageId" TEXT NOT NULL,

    CONSTRAINT "SavedChat_pkey" PRIMARY KEY ("creator")
);
