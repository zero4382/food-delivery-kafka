# 10 Minute Presentation Outline

## Slide 1 Title and Members

**Real-Time Food Delivery Updates Using Apache Kafka**

- Hsu Shwe Yaung - 6611665
- Soe Thura Lwin - 6540062
- Khaing Zaw Lin - 6611924

## Slide 2 Scenario

A food delivery platform has order, customer, rider, and notification services. All of them need the latest order status.

## Slide 3 Pain Point

Direct service-to-service communication can lose an update when one service is temporarily unavailable. For example, the rider service may miss the READY update.

## Slide 4 Technology

Apache Kafka is an event-streaming platform. The Order Service publishes an event to one topic. The other services read that event independently.

## Slide 5 Implementation

Show the architecture diagram and briefly name the tools: Apache Kafka, Node.js, Express, KafkaJS, Docker Compose, curl, and GitHub.

## Slide 6 Live Demo and Result

1. Send a normal order update and show all three consumers.
2. Stop the Rider Service.
3. Send a READY update.
4. Start the Rider Service, wait about 20 seconds, and show that it receives the missed update.

Result: order updates are shared in real time, services have fewer direct dependencies, and a temporary service outage does not lose the update.

## Speaker Split

- Hsu Shwe Yaung: Slides 1-3, about 3 minutes
- Soe Thura Lwin: Slides 4-5, about 3 minutes
- Khaing Zaw Lin: Slide 6 and live demo, about 4 minutes
