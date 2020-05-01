import {MigrationInterface, QueryRunner} from "typeorm";

export class movieAddCountry1588350532800 implements MigrationInterface {
    name = 'movieAddCountry1588350532800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movies` ADD `country` varchar(255) NOT NULL", undefined);
        await queryRunner.query("CREATE INDEX `IDX_cceeb8e1d45d706bcc4049591a` ON `movies` (`country`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_cceeb8e1d45d706bcc4049591a` ON `movies`", undefined);
        await queryRunner.query("ALTER TABLE `movies` DROP COLUMN `country`", undefined);
    }

}
