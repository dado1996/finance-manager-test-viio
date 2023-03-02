/*
  Warnings:

  - Added the required column `bankName` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValue` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `bankName` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalValue` DOUBLE NOT NULL;
