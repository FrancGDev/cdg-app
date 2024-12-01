/*
  Warnings:

  - You are about to drop the column `privileges` on the `role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `role` DROP COLUMN `privileges`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `roleId` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Privilege` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Privilege_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePrivilege` (
    `roleId` INTEGER NOT NULL,
    `privilegeId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `privilegeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePrivilege` ADD CONSTRAINT `RolePrivilege_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePrivilege` ADD CONSTRAINT `RolePrivilege_privilegeId_fkey` FOREIGN KEY (`privilegeId`) REFERENCES `Privilege`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
