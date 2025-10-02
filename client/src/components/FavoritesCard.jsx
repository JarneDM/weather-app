import { useEffect } from "react";

export default function FavoritesCard({ favorites, setFavorites, fetchWeather, setError }) {
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/favorites");
        const favs = await res.json();
        setFavorites(favs);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFavorites();
  }, [setFavorites, setError]);

  return (
    <div className="mt-6 bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-4 w-full">
      <h3 className="text-lg font-bold mb-2">Favorites</h3>
      <ul className="flex flex-col space-y-2 max-h-36 overflow-y-auto">
        {favorites.map((fav) => (
          <li key={fav}>
            <button
              onClick={() => fetchWeather(fav)}
              className="w-[95%] text-left p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 font-medium text-blue-800"
            >
              {fav}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
