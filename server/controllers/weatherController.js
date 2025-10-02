import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

const weatherController = {
  async getCityWeather(req, res) {
    const { city } = req.params;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const data = await response.json();

      const weather = {
        city: data.name,
        temperatureC: parseInt(data.main.temp),
        temperatureF: parseInt((data.main.temp * 9) / 5 + 32),
        condition: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };

      res.json(weather);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather" });
    }
  },
};
export default weatherController;
