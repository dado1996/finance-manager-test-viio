/*
  Warnings:

  - You are about to drop the column `accountId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `clientReceiverId` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `accountReceiverId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountSenderId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_clientReceiverId_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `accountId`,
    DROP COLUMN `clientReceiverId`,
    ADD COLUMN `accountReceiverId` INTEGER NOT NULL,
    ADD COLUMN `accountSenderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountSenderId_fkey` FOREIGN KEY (`accountSenderId`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountReceiverId_fkey` FOREIGN KEY (`accountReceiverId`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
