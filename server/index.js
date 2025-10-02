import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

import weatherController from "./controllers/weatherController.js";

const app = express();
app.use(express.json());

app.get("/api/weather/:city", weatherController.getCityWeather);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
