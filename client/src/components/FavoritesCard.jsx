import { TrashIcon } from "@heroicons/react/24/solid";

export default function FavoritesCard({ favorites, fetchWeather, deleteFavorite }) {
  return (
    <div className="mt-6 bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-4 w-full">
      <h3 className="text-lg font-bold mb-2">Favorites</h3>
      <ul className="flex flex-col space-y-2 max-h-36 overflow-y-auto">
        {favorites.map((fav) => (
          <li
            key={fav}
            className="flex justify-between items-center flex-1 text-left p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 w-[95%]"
          >
            <button onClick={() => fetchWeather(fav)} className="font-medium text-blue-800 w-full cursor-pointer text-left">
              {fav}
            </button>
            <button onClick={() => deleteFavorite(fav)} className="ml-2 text-red-500 hover:text-red-700">
              <TrashIcon className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
