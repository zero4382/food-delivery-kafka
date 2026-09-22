const { Kafka, logLevel } = require("kafkajs");
const { brokers, topic } = require("./config");

async function setup() {
  const kafka = new Kafka({
    clientId: "topic-setup",
    brokers,
    logLevel: logLevel.NOTHING,
  });
  const admin = kafka.admin();

  try {
    await admin.connect();
    const created = await admin.createTopics({
      waitForLeaders: true,
      topics: [{ topic, numPartitions: 1, replicationFactor: 1 }],
    });

    console.log(created ? `Created topic: ${topic}` : `Topic already exists: ${topic}`);
  } finally {
    await admin.disconnect();
  }
}

setup().catch((error) => {
  console.error("Could not prepare Kafka:", error.message);
  process.exit(1);
});
