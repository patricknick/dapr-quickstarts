import { CommunicationProtocolEnum, DaprServer } from "@dapr/dapr";

const DAPR_HOST = process.env.DAPR_HOST || "127.0.0.1";
const DAPR_GRPC_PORT = process.env.DAPR_GRPC_PORT || "";
const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.APP_PORT || 50051;

async function main() {
  const server = new DaprServer(
    SERVER_HOST,
    SERVER_PORT,
    DAPR_HOST,
    DAPR_GRPC_PORT,
    CommunicationProtocolEnum.GRPC
  );

  // Dapr subscription routes orders topic to this route
  server.pubsub.subscribe("orderpubsub", "orders", (data) =>
    console.log("Subscriber received: " + JSON.stringify(data))
  );

  await server.start();
}

main().catch((e) => console.error(e));
