const crypto = require("node:crypto");
const express = require("express");
const { Kafka, logLevel, Partitioners } = require("kafkajs");
const { brokers, topic } = require("./config");

const allowedStatuses = ["PLACED", "PREPARING", "READY"];
const port = Number(process.env.PORT || 3000);
const app = express();

const kafka = new Kafka({
  clientId: "order-service",
  brokers,
  logLevel: logLevel.NOTHING,
});
const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/orders/:orderId/status", async (request, response) => {
  const orderId = request.params.orderId.trim();
  const status = String(request.body.status || "").toUpperCase();

  if (!orderId) {
    return response.status(400).json({ error: "orderId is required" });
  }

  if (!allowedStatuses.includes(status)) {
    return response.status(400).json({
      error: `status must be one of: ${allowedStatuses.join(", ")}`,
    });
  }

  const event = {
    eventId: crypto.randomUUID(),
    orderId,
    status,
    occurredAt: new Date().toISOString(),
  };

  try {
    await producer.send({
      topic,
      messages: [{ key: orderId, value: JSON.stringify(event) }],
    });

    console.log(`Published: Order ${orderId} is ${status}`);
    return response.status(202).json({ message: "Order update published", event });
  } catch (error) {
    console.error("Could not publish order update:", error.message);
    return response.status(503).json({ error: "Kafka is temporarily unavailable" });
  }
});

async function start() {
  await producer.connect();
  const server = app.listen(port, () => {
    console.log(`Order service listening on http://localhost:${port}`);
  });

  const stop = async () => {
    server.close();
    await producer.disconnect();
    process.exit(0);
  };

  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
}

start().catch((error) => {
  console.error("Could not start order service:", error.message);
  process.exit(1);
});
