import {
  createServer,
  IncomingMessage,
  ServerResponse,
  type Server,
} from "http";
import { json } from "stream/consumers";
import { routeHandler } from "./routes/routes";

const port = 5000;
const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

server.listen(port, () => {
  console.log(`My first server is running on port: ${port}`);
});
