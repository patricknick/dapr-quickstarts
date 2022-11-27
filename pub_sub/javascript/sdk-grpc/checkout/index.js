import { CommunicationProtocolEnum, DaprClient } from "@dapr/dapr";

const DAPR_HOST = process.env.DAPR_HOST || "127.0.0.1";
const DAPR_GRPC_PORT = process.env.DAPR_GRPC_PORT || "50051";
const PUBSUB_NAME = "orderpubsub";
const PUBSUB_TOPIC = "orders";

async function main() {
  const client = new DaprClient(
    DAPR_HOST,
    DAPR_GRPC_PORT,
    CommunicationProtocolEnum.GRPC
  );

  for (var i = 1; i <= 10; i++) {
    const order = { orderId: i };

    // Publish an event using Dapr pub/sub
    await client.pubsub.publish(PUBSUB_NAME, PUBSUB_TOPIC, order);
    console.log("Published data: " + JSON.stringify(order));

    await sleep(1000);
  }
}
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((e) => console.error(e));
