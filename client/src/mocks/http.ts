import { handlers } from "@/mocks/handlers";
import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";

// import { setupServer } from "msw/node";

// export const server = setupServer(...handlers);

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
