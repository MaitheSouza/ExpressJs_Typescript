import express from "express"
import middleware from "./middleware/middleware";
import router from "./controllers/userController";
import NodeCache from "node-cache";
import { randomUUID } from "crypto";
import env from "./config/env";

const app = express();
const key = env.ENV === "PROD" ? env.KEY_AUTH : randomUUID();
const cache = new NodeCache();
const timeCache = 20;
const PORT = 4200;

app.use(express.json())
app.use("/users", middleware, router)

app.listen(PORT, () => console.log(`Server(${env.ENV}) is running on port ${PORT}\nAuthorization key is ${key}`));

export default {app, cache, key, timeCache};