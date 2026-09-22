# Real-Time Food Delivery Updates Using Apache Kafka

This is a small runnable demonstration for Project 02 - Tech Update.

## Members

- Hsu Shwe Yaung - 6611665
- Soe Thura Lwin - 6540062
- Khaing Zaw Lin - 6611924

## Scenario

When an order status changes, the customer, rider, and notification services all need the update. The Order Service publishes the update to Apache Kafka. Each service consumes the event independently. If the Rider Service is temporarily stopped, it can read the missed event after it restarts.

## Requirements

- Docker Desktop with Docker Compose
- curl or Postman

## Start the Project

Run this command in the project folder:

```bash
docker compose up --build
```

Wait until the Order Service and all three consumer services say they are ready.

## Send an Order Update

Open a second terminal and run:

```bash
./scripts/send-update.sh 101 PREPARING
./scripts/send-update.sh 101 READY
```

Allowed statuses are `PLACED`, `PREPARING`, and `READY`.

The same request can be sent directly:

```bash
curl --request POST http://localhost:3000/orders/101/status \
  --header "Content-Type: application/json" \
  --data '{"status":"READY"}'
```

## Main Presentation Demo

Keep `docker compose up` running in the first terminal. Use a second terminal for these commands.

1. Stop only the Rider Service:

   ```bash
   docker compose stop rider-consumer
   ```

2. Publish a new update while the Rider Service is stopped:

   ```bash
   ./scripts/send-update.sh 202 READY
   ```

3. The Customer and Notification services receive the update. Start the Rider Service again:

   ```bash
   docker compose start rider-consumer
   ```

4. Wait about 20 seconds, then show that the Rider Service receives the READY event that was published while it was stopped:

   ```bash
   sleep 20
   docker compose logs --tail=20 rider-consumer
   ```

## Stop the Project

```bash
docker compose down
```

## Project Files

- `src/order-service.js` - accepts status updates and publishes Kafka events
- `src/consumer.js` - runs the customer, rider, or notification consumer
- `src/setup.js` - creates the `order-updates` topic
- `docker-compose.yml` - starts Kafka and all application services
- `docs/architecture.md` - architecture and sequence diagrams
- `docs/presentation-outline.md` - six-slide presentation plan

## API

### `GET /health`

Checks whether the Order Service is running.

### `POST /orders/:orderId/status`

Example body:

```json
{
  "status": "READY"
}
```
