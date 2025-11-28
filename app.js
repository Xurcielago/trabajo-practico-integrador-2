import express from "express";
import "dotenv/config";
import { DBStart } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { routes } from "./src/routes/index.js";

const PORT = 3004;
const app = express();

const corsOptions = {
  origin: `https://localhost:${PORT}`,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", routes)

app.listen(PORT, async () => {
  try {
    DBStart();
    console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
  } catch (error) {
    console.log("Error al encender el servidor" + error);
  }
});
