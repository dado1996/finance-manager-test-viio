/*
  Warnings:

  - You are about to drop the column `account_id` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Accounts_account_id_key` ON `accounts`;

-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `account_id`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `uniqueId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Accounts_accountId_key` ON `Accounts`(`accountId`);

-- CreateIndex
CREATE UNIQUE INDEX `Transactions_uniqueId_key` ON `Transactions`(`uniqueId`);
