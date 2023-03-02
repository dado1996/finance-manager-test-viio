/*
  Warnings:

  - Added the required column `accountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientReceiverId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` MODIFY `password` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `accountId` INTEGER NOT NULL,
    ADD COLUMN `clientReceiverId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_clientReceiverId_fkey` FOREIGN KEY (`clientReceiverId`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
