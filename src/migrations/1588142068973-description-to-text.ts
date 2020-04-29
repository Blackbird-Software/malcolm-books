import {MigrationInterface, QueryRunner} from "typeorm";

export class descriptionToText1588142068973 implements MigrationInterface {
    name = 'descriptionToText1588142068973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `genres` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `genres` ADD `description` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `movies` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `movies` ADD `description` text NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movies` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `movies` ADD `description` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `genres` DROP COLUMN `description`", undefined);
        await queryRunner.query("ALTER TABLE `genres` ADD `description` varchar(255) NULL", undefined);
    }

}
