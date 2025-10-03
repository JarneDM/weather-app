import fs from "fs";
import path from "path";
const favoritesFile = path.join("./favorites.json");

const favoriteController = {
  async getFavorites(req, res) {
    try {
      const data = JSON.parse(fs.readFileSync(favoritesFile, "utf-8"));
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  },

  async addFavorites(req, res) {
    try {
      const { city } = req.body;

      const data = JSON.parse(fs.readFileSync(favoritesFile, "utf-8"));

      if (!data.includes(city)) data.push(city);
      fs.writeFileSync(favoritesFile, JSON.stringify(data, null, 2));

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to add favorite" });
    }
  },

  async deleteFavorite(req, res) {
    try {
      const { city } = req.params;

      let data = JSON.parse(fs.readFileSync(favoritesFile, "utf-8"));
      data = data.filter((c) => c !== city);

      fs.writeFileSync(favoritesFile, JSON.stringify(data, null, 2));

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to delete favorite" });
    }
  },

  async changeOrder(req, res) {
    try {
      const { newOrder } = req.body;
      if (!Array.isArray(newOrder)) {
        return res.status(400).json({ error: "newOrder must be an array" });
      }

      fs.writeFileSync(favoritesFile, JSON.stringify(newOrder, null, 2));

      res.json(newOrder);
    } catch (err) {
      res.status(500).json({ error: "failed to reorder favorites" });
    }
  },
};

export default favoriteController;
