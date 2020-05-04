import {Module} from '@nestjs/common';
import {HealthController} from './health.controller';
import {TerminusModule} from '@nestjs/terminus';
import {DatabaseOrmModule} from "../database-orm.module";

@Module({
    controllers: [HealthController],
    imports: [
        DatabaseOrmModule(),
        TerminusModule,
    ],
})
export class HealthModule {
}
