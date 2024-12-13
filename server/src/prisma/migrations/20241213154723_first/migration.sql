-- CreateTable
CREATE TABLE `chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(191) NOT NULL,
    `msg` VARCHAR(191) NOT NULL,
    `msgDatenTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `onlinelist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickName` VARCHAR(191) NOT NULL,
    `joinedDatenTime` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
