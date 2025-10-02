import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import FavoritesCard from "./components/FavoritesCard";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/weather/${cityName}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 bg-white bg-opacity-80 backdrop-blur-md border border-gray-300 rounded-xl shadow-lg p-6 w-80"
      >
        <h1 className="text-2xl font-bold text-blue-700">Weather App</h1>
        <input
          className="border border-gray-400 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg w-full transition-colors">
          {loading ? "Loading..." : "Get Weather"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      {weather && <WeatherCard weather={weather} favorites={favorites} setFavorites={setFavorites} setError={setError} />}

      {favorites.length > 0 && (
        <FavoritesCard favorites={favorites} setFavorites={setFavorites} fetchWeather={fetchWeather} setError={setError} />
      )}
    </div>
  );
}
