/*
  Warnings:

  - You are about to drop the column `incidencia` on the `informe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `informe` DROP COLUMN `incidencia`,
    ADD COLUMN `incidenciaId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Incidencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Incidencia_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserIncidencias` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserIncidencias_AB_unique`(`A`, `B`),
    INDEX `_UserIncidencias_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Informe` ADD CONSTRAINT `Informe_incidenciaId_fkey` FOREIGN KEY (`incidenciaId`) REFERENCES `Incidencia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserIncidencias` ADD CONSTRAINT `_UserIncidencias_A_fkey` FOREIGN KEY (`A`) REFERENCES `Incidencia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserIncidencias` ADD CONSTRAINT `_UserIncidencias_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
