const broker = process.env.KAFKA_BROKER || "localhost:9092";

module.exports = {
  brokers: broker.split(",").map((value) => value.trim()),
  topic: process.env.KAFKA_TOPIC || "order-updates",
};
