import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1588370966831 implements MigrationInterface {
    name = 'initialize1588370966831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `directors` (`id` varchar(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `genres` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` text NULL, UNIQUE INDEX `IDX_f105f8230a83b86a346427de94` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `files` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `path` varchar(255) NOT NULL, `originalName` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_332d10755187ac3c580e21fbc0` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movies` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `premiere` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `coverId` varchar(36) NULL, INDEX `IDX_5aa0bbd146c0082d3fc5a0ad5d` (`title`), INDEX `IDX_258802d4e810d58c51bcf146c9` (`premiere`), INDEX `IDX_cceeb8e1d45d706bcc4049591a` (`country`), UNIQUE INDEX `REL_a26c4a0a57f5f15e392770ce5f` (`coverId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `actors` (`id` varchar(36) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `gender` enum ('m', 'f') NOT NULL, INDEX `IDX_d151ef1623fd030f4093a55f07` (`gender`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `salt` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_has_genres` (`moviesId` varchar(36) NOT NULL, `genresId` varchar(36) NOT NULL, INDEX `IDX_c44c12a1a550b00d88acced4e3` (`moviesId`), INDEX `IDX_ad86f5914b9137bf83e60721a7` (`genresId`), PRIMARY KEY (`moviesId`, `genresId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_has_directors` (`moviesId` varchar(36) NOT NULL, `directorsId` varchar(36) NOT NULL, INDEX `IDX_50b396623f43d81877d1699447` (`moviesId`), INDEX `IDX_ecb89516f79101754bfc8ad97a` (`directorsId`), PRIMARY KEY (`moviesId`, `directorsId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_has_actors` (`moviesId` varchar(36) NOT NULL, `actorsId` varchar(36) NOT NULL, INDEX `IDX_3a8a2d0f931603d229f196baa9` (`moviesId`), INDEX `IDX_ca9e652c4c6065dd5c4a65d92b` (`actorsId`), PRIMARY KEY (`moviesId`, `actorsId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `movies` ADD CONSTRAINT `FK_a26c4a0a57f5f15e392770ce5f9` FOREIGN KEY (`coverId`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
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
        await queryRunner.query("ALTER TABLE `movies` DROP FOREIGN KEY `FK_a26c4a0a57f5f15e392770ce5f9`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ca9e652c4c6065dd5c4a65d92b` ON `movie_has_actors`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3a8a2d0f931603d229f196baa9` ON `movie_has_actors`", undefined);
        await queryRunner.query("DROP TABLE `movie_has_actors`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ecb89516f79101754bfc8ad97a` ON `movie_has_directors`", undefined);
        await queryRunner.query("DROP INDEX `IDX_50b396623f43d81877d1699447` ON `movie_has_directors`", undefined);
        await queryRunner.query("DROP TABLE `movie_has_directors`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ad86f5914b9137bf83e60721a7` ON `movie_has_genres`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c44c12a1a550b00d88acced4e3` ON `movie_has_genres`", undefined);
        await queryRunner.query("DROP TABLE `movie_has_genres`", undefined);
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d151ef1623fd030f4093a55f07` ON `actors`", undefined);
        await queryRunner.query("DROP TABLE `actors`", undefined);
        await queryRunner.query("DROP INDEX `REL_a26c4a0a57f5f15e392770ce5f` ON `movies`", undefined);
        await queryRunner.query("DROP INDEX `IDX_cceeb8e1d45d706bcc4049591a` ON `movies`", undefined);
        await queryRunner.query("DROP INDEX `IDX_258802d4e810d58c51bcf146c9` ON `movies`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5aa0bbd146c0082d3fc5a0ad5d` ON `movies`", undefined);
        await queryRunner.query("DROP TABLE `movies`", undefined);
        await queryRunner.query("DROP INDEX `IDX_332d10755187ac3c580e21fbc0` ON `files`", undefined);
        await queryRunner.query("DROP TABLE `files`", undefined);
        await queryRunner.query("DROP INDEX `IDX_f105f8230a83b86a346427de94` ON `genres`", undefined);
        await queryRunner.query("DROP TABLE `genres`", undefined);
        await queryRunner.query("DROP TABLE `directors`", undefined);
    }

}
