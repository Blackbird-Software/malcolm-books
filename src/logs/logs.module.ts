import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {LogsService} from './logs.service';
import {rmqClientOptions} from "../config/rmq-client.options";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'QUEUE_SERVICE',
                ...rmqClientOptions,
            },
        ]),
    ],
    providers: [LogsService],
    exports: [LogsService]
})

export class LogsModule {
}