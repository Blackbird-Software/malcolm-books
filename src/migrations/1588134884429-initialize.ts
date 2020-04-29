import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1588134884429 implements MigrationInterface {
    name = 'initialize1588134884429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `salt` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_has_genres` (`moviesId` varchar(36) NOT NULL, `genresId` varchar(36) NOT NULL, INDEX `IDX_c44c12a1a550b00d88acced4e3` (`moviesId`), INDEX `IDX_ad86f5914b9137bf83e60721a7` (`genresId`), PRIMARY KEY (`moviesId`, `genresId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_has_directors` (`moviesId` varchar(36) NOT NULL, `directorsId` varchar(36) NOT NULL, INDEX `IDX_50b396623f43d81877d1699447` (`moviesId`), INDEX `IDX_ecb89516f79101754bfc8ad97a` (`directorsId`), PRIMARY KEY (`moviesId`, `directorsId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `movie_has_actors` (`moviesId` varchar(36) NOT NULL, `actorsId` varchar(36) NOT NULL, INDEX `IDX_3a8a2d0f931603d229f196baa9` (`moviesId`), INDEX `IDX_ca9e652c4c6065dd5c4a65d92b` (`actorsId`), PRIMARY KEY (`moviesId`, `actorsId`)) ENGINE=InnoDB", undefined);
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
    }

}
