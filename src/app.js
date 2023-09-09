import express from "express";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectDB();

connection.on("error", (erro) => {
  console.error("DB Connection error!", erro);
});

connection.once("open", () => {
  console.log("Connection with DB it's Open...");
});

const app = express();
routes(app);

export default app;
