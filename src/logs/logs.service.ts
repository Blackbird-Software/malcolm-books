import {Inject, Injectable, OnModuleInit, Scope} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import config from 'config';
import {ActionType} from "./enum/action-types";
import {MessagePatternType} from "./enum/message-pattern-types";
const service = config.service;

@Injectable({
    scope: Scope.TRANSIENT,
})
export class LogsService implements OnModuleInit {

    private className?: string;

    constructor(
        @Inject('QUEUE_SERVICE') private readonly clientRmq: ClientProxy,
    ) {
    }

    async onModuleInit() {
        await this.clientRmq.connect();
    }

    async sendMessage(object: any, action: ActionType, entity: string = this.className): Promise<any> {
        const pattern = {type: MessagePatternType.APP_LOGS};
        const data = {
            action,
            service: service.id,
            entity: entity,
            objectId: object.id,
            object: JSON.stringify(object)
        };

        this.clientRmq.send(pattern, data)
            .toPromise()
            .catch((error: any) => {
                    console.error(error);
                }
            );
    }

    setClassName(className: string): void {
        this.className = className;
    }
}