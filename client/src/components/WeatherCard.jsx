// import { useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export default function WeatherCard({ weather, favorites, setFavorites, setError }) {
  const isFavorite = favorites.includes(weather.city);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        const res = await fetch(`http://localhost:5000/api/favorites/${weather.city}`, {
          method: "DELETE",
        });
        const updated = await res.json();
        setFavorites(updated);
      } else {
        const res = await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: weather.city }),
        });
        const updated = await res.json();
        setFavorites(updated);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-6 bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6 w-full text-center relative">
      <button onClick={toggleFavorite} className="absolute top-3 right-3 text-yellow-400">
        {isFavorite ? <StarSolid className="w-6 h-6" /> : <StarOutline className="w-6 h-6" />}
      </button>

      <h2 className="text-xl font-bold mb-2">{weather.city}</h2>
      <img src={weather.icon} alt={weather.condition} className="mx-auto mb-2" />
      <p className="text-lg mb-1">
        {weather.temperatureC}°C / {weather.temperatureF}°F
      </p>
      <p className="text-gray-700 capitalize">{weather.condition}</p>
    </div>
  );
}
