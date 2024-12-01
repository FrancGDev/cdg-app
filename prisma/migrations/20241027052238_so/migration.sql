/*
  Warnings:

  - You are about to drop the column `incidenciaId` on the `informe` table. All the data in the column will be lost.
  - You are about to drop the `incidencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissionincidencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userpermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `Informe_incidenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `permissionincidencia` DROP FOREIGN KEY `PermissionIncidencia_incidenciaId_fkey`;

-- DropForeignKey
ALTER TABLE `permissionincidencia` DROP FOREIGN KEY `PermissionIncidencia_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `userpermission` DROP FOREIGN KEY `UserPermission_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `userpermission` DROP FOREIGN KEY `UserPermission_userId_fkey`;

-- AlterTable
ALTER TABLE `informe` DROP COLUMN `incidenciaId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'SUPERVISOR', 'LECTOR') NOT NULL DEFAULT 'LECTOR';

-- DropTable
DROP TABLE `incidencia`;

-- DropTable
DROP TABLE `permission`;

-- DropTable
DROP TABLE `permissionincidencia`;

-- DropTable
DROP TABLE `userpermission`;

-- CreateTable
CREATE TABLE `Equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
