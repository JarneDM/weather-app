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
    <div className="mt-6 bg-white bg-opacity-80 backdrop-blur-md border border-gray-300 rounded-xl shadow-lg p-4 w-80">
      <h3 className="text-lg font-bold mb-2">Favorites</h3>
      <ul className="flex flex-col space-y-2 max-h-36 overflow-y-auto">
        {favorites.map((fav) => (
          <li key={fav}>
            <button
              onClick={() => fetchWeather(fav)}
              className="w-full text-left p-3 rounded-lg bg-blue-100 hover:bg-blue-200 shadow-sm hover:shadow-md transition-all duration-200 font-medium text-blue-800"
            >
              {fav}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
