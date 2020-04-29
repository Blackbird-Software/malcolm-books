import * as configBag from 'config';
import {ConnectionOptions} from "typeorm";

const dbConfig = configBag.get('db');

const config: ConnectionOptions = {
    type: process.env.DB_DRIVER || dbConfig.type,
    host: process.env.DB_HOSTNAME || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [
        __dirname + '/../**/*.entity.ts'
    ],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    charset: 'utf8mb4_unicode_ci',

    migrationsRun: false,
    logging: true,
    logger: 'file',

    migrations: [__dirname + '/../migrations/**/*.ts'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export = config;
