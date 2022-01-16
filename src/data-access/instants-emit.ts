import amqp from 'amqplib';
import logger from "../logger";
import { Settings } from "../settings";

export default function makeInstantsEmit() {
    let connection, channel;
    const exchange = Settings.rabbitMq.exchange;
    const log = logger('Instants-emit', Settings.logging.instantEmit);

    return Object.freeze({
        send
    })

    async function connect() {
        log.info(`connection with RabbitMQ on exchange = ${exchange}`);
        connection = await amqp.connect("amqp://localhost");
        log.info(`connection established`)
        channel = await connection.createChannel();
        log.info(`channel created`)
        await channel.assertExchange(exchange, 'fanout', { durable: false });
    }

    async function send(fileName: string) {
        if (!channel) await connect();
        log.info(`publish ${fileName} on ${exchange}`)
        channel.publish(exchange, '', Buffer.from(fileName));
    }
}