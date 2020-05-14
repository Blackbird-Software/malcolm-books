import {RmqOptions, Transport} from '@nestjs/microservices';
import config from 'config';

const queueConfig = config.queue;
const user = process.env.RABBITMQ_USER || queueConfig.user;
const password = process.env.RABBITMQ_PASSWORD || queueConfig.password;
const hostname = process.env.RABBITMQ_HOSTNAME || queueConfig.hostname;
const port = parseInt(process.env.RABBITMQ_PORT, 10) || queueConfig.port;

export const rmqClientOptions: RmqOptions = {
    transport: Transport.RMQ,
    options: {
        urls: [
            `amqp://${user}:${password}@${hostname}:${port}`
        ],
        queue: 'logs_queue',
        prefetchCount: 1,
        queueOptions: {
            durable: false
        },
    },
}