/*
  Warnings:

  - You are about to drop the column `incidenciaId` on the `informe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `Informe_incidenciaId_fkey`;

-- AlterTable
ALTER TABLE `informe` DROP COLUMN `incidenciaId`,
    ADD COLUMN `incidencia` VARCHAR(191) NULL;
