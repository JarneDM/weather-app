import { useState, useEffect } from "react";
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

  const deleteFavorite = async (cityName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/favorites/${cityName}`, {
        method: "DELETE",
      });
      const updated = await res.json();
      setFavorites(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await fetch("https://weather-app-v1gz.onrender.com/api/favorites");
        const favs = await res.json();
        setFavorites(favs);
      } catch (err) {
        setError(err.message);
      }
    };
    loadFavorites();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
  };

  useEffect(() => {
    if (!weather) fetchWeather("ghent");
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url(./assets/background.jpg)] bg-no-repeat bg-cover">
      <div className="w-full max-w-md grid items-center px-4 sm:px-0 sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6 w-full"
        >
          <h1 className="text-2xl text-black underline">Weather App</h1>
          <input
            className="border border-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-white text-black"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg w-fit transition-colors backdrop-blur-lg">
            {loading ? "Loading..." : "Get Weather"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        {weather && (
          <WeatherCard
            weather={weather}
            favorites={favorites}
            setFavorites={setFavorites}
            setError={setError}
            deleteFavorite={deleteFavorite}
          />
        )}

        <FavoritesCard
          favorites={favorites}
          fetchWeather={fetchWeather}
          deleteFavorite={deleteFavorite}
          setFavorites={setFavorites}
          setError={setError}
        />
      </div>
    </div>
  );
}
