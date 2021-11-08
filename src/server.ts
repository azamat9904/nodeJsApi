import express from "express";
import * as dotenv from "dotenv";
import accountRoutes from "./routes/account";
import tokenRoutes from "./routes/token";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"

const app = express();
const PORT = 8000;

dotenv.config();

app.use(express.json());

app.use("/account", accountRoutes);
app.use("/token", tokenRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const runningFn = () => { console.log(`Server is running on port ${PORT}`) }
app.listen(PORT, runningFn);

