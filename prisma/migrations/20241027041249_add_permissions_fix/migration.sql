/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_permissiontouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_permissiontouser` DROP FOREIGN KEY `_PermissionToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_permissiontouser` DROP FOREIGN KEY `_PermissionToUser_B_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- DropTable
DROP TABLE `_permissiontouser`;

-- DropTable
DROP TABLE `permission`;

-- CreateTable
CREATE TABLE `UserPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `permission` ENUM('VIEW_REPORTS', 'CREATE_REPORTS', 'DELETE_REPORTS', 'VIEW_INCIDENCE_INFRACCION') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
