import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from './routes/index.js'

const connectionDb = await connectToDatabase();

connectionDb.on("error", (error) => {
  console.error("Connection error => ", error);
});

connectionDb.once("open", () => {
  console.log("Connection opened!");
});

const app = express();

routes(app);

app.get("/os/:id", (req, res) => {
  const os = osList.find((o) => o.id === req.params.id);
  res.status(200).json({
    data: {
      os,
    },
  });
});

app.post("/os", (req, res) => {
  osList.push(req.body);
  res.status(201).json({
    data: { message: "success", status: res.statusCode },
  });
});

app.put("/os/:id", (req, res) => {
  const item = osList.findIndex((o) => o.id === req.params.id);
  osList[item] = {
    id: req.params.id,
    ...req.body,
  };
  res.status(200).json({
    data: { message: "success", status: res.statusCode },
  });
});

app.delete("/os/:id", (req, res) => {
  const updatedList = osList.filter((o) => o.id !== req.params.id);
  osList = updatedList;
  console.log(updatedList);
  res.json({
    data: {
      message: "success",
      status: res.statusCode,
    },
  });
});

export default app;
