/*
  Warnings:

  - Added the required column `categoria` to the `CITA_MEDICA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CITA_MEDICA` ADD COLUMN `categoria` VARCHAR(191) NOT NULL;
