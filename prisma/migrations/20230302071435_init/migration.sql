-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `clients` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `status` ENUM('PENDING', 'ONHOLD', 'DONE') NOT NULL DEFAULT 'PENDING';
