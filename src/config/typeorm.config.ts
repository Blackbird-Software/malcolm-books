import config from 'config';
import {ConnectionOptions} from 'typeorm';

const dbConfig = config.db;
const ormConfig: ConnectionOptions = {
    type: process.env.DATABASE_DRIVER || dbConfig.type,
    host: process.env.DATABASE_HOSTNAME || dbConfig.host,
    port: parseInt(process.env.DATABASE_PORT) || dbConfig.port,
    username: process.env.DATABASE_USERNAME || dbConfig.username,
    password: process.env.DATABASE_PASSWORD || dbConfig.password,
    database: process.env.DATABASE_NAME || dbConfig.database,
    entities: [
        __dirname + '/../**/*.entity.ts',
    ],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    charset: 'utf8mb4_unicode_ci',
    migrationsRun: !!process.env.RUN_MIGRATIONS || false,
    logging: true,
    logger: 'advanced-console',
    migrations: [__dirname + '/../migrations/*.ts'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    extra: {
        debug: false,
    },
};

export = ormConfig;
