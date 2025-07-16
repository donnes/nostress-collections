import { createClerkHandler } from "@clerk/tanstack-react-start/server";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createRouter } from "./router";

const router = createRouter();

export default createClerkHandler(
  createStartHandler({
    createRouter: () => router,
  })
)(defaultStreamHandler);
