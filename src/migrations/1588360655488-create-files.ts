import {MigrationInterface, QueryRunner} from "typeorm";

export class createFiles1588360655488 implements MigrationInterface {
    name = 'createFiles1588360655488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `files` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `path` varchar(255) NOT NULL, `originalName` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_332d10755187ac3c580e21fbc0` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_332d10755187ac3c580e21fbc0` ON `files`", undefined);
        await queryRunner.query("DROP TABLE `files`", undefined);
    }

}
