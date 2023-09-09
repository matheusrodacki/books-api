import express from "express";
import connectDB from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";

const connection = await connectDB();

connection.on("error", (erro) => {
  console.error("DB Connection error!", erro);
});

connection.once("open", () => {
  console.log("Connection with DB it's Open...");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;
