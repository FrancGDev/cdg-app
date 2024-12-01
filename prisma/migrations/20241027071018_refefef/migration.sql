/*
  Warnings:

  - You are about to drop the `_userincidencias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `incidencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_userincidencias` DROP FOREIGN KEY `_UserIncidencias_A_fkey`;

-- DropForeignKey
ALTER TABLE `_userincidencias` DROP FOREIGN KEY `_UserIncidencias_B_fkey`;

-- DropTable
DROP TABLE `_userincidencias`;

-- DropTable
DROP TABLE `incidencia`;
