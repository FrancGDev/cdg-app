/*
  Warnings:

  - You are about to drop the column `permission` on the `userpermission` table. All the data in the column will be lost.
  - You are about to drop the `equipo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permissionId` to the `UserPermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `informe` ADD COLUMN `incidenciaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `userpermission` DROP COLUMN `permission`,
    ADD COLUMN `permissionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `equipo`;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('ALL', 'VIEW_REPORTS', 'CREATE_REPORTS', 'DELETE_REPORTS', 'VIEW_INCIDENCE_INFRACCION') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incidencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    UNIQUE INDEX `Incidencia_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PermissionIncidencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionId` INTEGER NOT NULL,
    `incidenciaId` INTEGER NOT NULL,

    UNIQUE INDEX `PermissionIncidencia_permissionId_incidenciaId_key`(`permissionId`, `incidenciaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionIncidencia` ADD CONSTRAINT `PermissionIncidencia_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionIncidencia` ADD CONSTRAINT `PermissionIncidencia_incidenciaId_fkey` FOREIGN KEY (`incidenciaId`) REFERENCES `Incidencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Informe` ADD CONSTRAINT `Informe_incidenciaId_fkey` FOREIGN KEY (`incidenciaId`) REFERENCES `Incidencia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
