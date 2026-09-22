const { Kafka, logLevel } = require("kafkajs");
const { brokers, topic } = require("./config");

const serviceName = process.env.SERVICE_NAME || "customer";
const groupId = process.env.GROUP_ID || `${serviceName}-service`;

const kafka = new Kafka({
  clientId: `${serviceName}-consumer`,
  brokers,
  logLevel: logLevel.NOTHING,
});
const consumer = kafka.consumer({ groupId });

function messageFor(event) {
  if (serviceName === "rider" && event.status === "READY") {
    return `Rider action: Pick up Order ${event.orderId}`;
  }

  if (serviceName === "notification") {
    return `Notification sent: Order ${event.orderId} is ${event.status}`;
  }

  return `${serviceName[0].toUpperCase()}${serviceName.slice(1)} update: Order ${event.orderId} is ${event.status}`;
}

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });
  console.log(`${serviceName} service is waiting for order updates...`);

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log(messageFor(event));
    },
  });
}

async function stop() {
  await consumer.disconnect();
  process.exit(0);
}

process.on("SIGTERM", stop);
process.on("SIGINT", stop);

start().catch((error) => {
  console.error(`${serviceName} service stopped:`, error.message);
  process.exit(1);
});
