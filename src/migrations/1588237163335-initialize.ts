import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1588237163335 implements MigrationInterface {
    name = 'initialize1588237163335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `directors` (`id` varchar(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `genres` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` text NULL, UNIQUE INDEX `IDX_f105f8230a83b86a346427de94` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movies` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `premiere` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_5aa0bbd146c0082d3fc5a0ad5d` (`title`), INDEX `IDX_258802d4e810d58c51bcf146c9` (`premiere`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `actors` (`id` varchar(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `gender` enum ('m', 'f') NOT NULL, INDEX `IDX_d151ef1623fd030f4093a55f07` (`gender`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_genres` ADD CONSTRAINT `FK_c44c12a1a550b00d88acced4e31` FOREIGN KEY (`moviesId`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_genres` ADD CONSTRAINT `FK_ad86f5914b9137bf83e60721a77` FOREIGN KEY (`genresId`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_directors` ADD CONSTRAINT `FK_50b396623f43d81877d16994476` FOREIGN KEY (`moviesId`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_directors` ADD CONSTRAINT `FK_ecb89516f79101754bfc8ad97a1` FOREIGN KEY (`directorsId`) REFERENCES `directors`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_actors` ADD CONSTRAINT `FK_3a8a2d0f931603d229f196baa99` FOREIGN KEY (`moviesId`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_actors` ADD CONSTRAINT `FK_ca9e652c4c6065dd5c4a65d92b3` FOREIGN KEY (`actorsId`) REFERENCES `actors`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `movie_has_actors` DROP FOREIGN KEY `FK_ca9e652c4c6065dd5c4a65d92b3`", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_actors` DROP FOREIGN KEY `FK_3a8a2d0f931603d229f196baa99`", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_directors` DROP FOREIGN KEY `FK_ecb89516f79101754bfc8ad97a1`", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_directors` DROP FOREIGN KEY `FK_50b396623f43d81877d16994476`", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_genres` DROP FOREIGN KEY `FK_ad86f5914b9137bf83e60721a77`", undefined);
        await queryRunner.query("ALTER TABLE `movie_has_genres` DROP FOREIGN KEY `FK_c44c12a1a550b00d88acced4e31`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d151ef1623fd030f4093a55f07` ON `actors`", undefined);
        await queryRunner.query("DROP TABLE `actors`", undefined);
        await queryRunner.query("DROP INDEX `IDX_258802d4e810d58c51bcf146c9` ON `movies`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5aa0bbd146c0082d3fc5a0ad5d` ON `movies`", undefined);
        await queryRunner.query("DROP TABLE `movies`", undefined);
        await queryRunner.query("DROP INDEX `IDX_f105f8230a83b86a346427de94` ON `genres`", undefined);
        await queryRunner.query("DROP TABLE `genres`", undefined);
        await queryRunner.query("DROP TABLE `directors`", undefined);
    }

}
