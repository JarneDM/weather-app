import express from "express";
import cors from "cors";

import weatherController from "./controllers/weatherController.js";
import favoriteController from "./controllers/favoriteController.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://weather-app-jarnedm.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/api/weather/:city", weatherController.getCityWeather);
app.get("/api/favorites", favoriteController.getFavorites);

app.post("/api/favorites", favoriteController.addFavorites);
app.delete("/api/favorites/:city", favoriteController.deleteFavorite);
app.put("/api/favorites", favoriteController.changeOrder);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
