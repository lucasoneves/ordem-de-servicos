import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from './routes/index.js'
import errorHandler from "./middlewares/errorHandler.js";

const connectionDb = await connectToDatabase();

connectionDb.on("error", (error) => {
  console.error("Connection error => ", error);
});

connectionDb.once("open", () => {
  console.log("Connection opened!");
});

const app = express();

routes(app);

app.use(errorHandler)

export default app;
