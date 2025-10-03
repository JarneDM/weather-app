import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import Sortable from "sortablejs";
// import { useEffect } from "react";

export default function FavoritesCard({ favorites, fetchWeather, deleteFavorite, setFavorites, setError }) {
  const listRef = useRef(null);
  useEffect(() => {
    if (!listRef.current) return;

    const sortable = Sortable.create(listRef.current, {
      animation: 150,
      onEnd: async (evt) => {
        const newOrder = [...favorites];
        const [movedItem] = newOrder.splice(evt.oldIndex, 1);
        newOrder.splice(evt.newIndex, 0, movedItem);

        setFavorites(newOrder);

        try {
          await fetch("http://localhost:5000/api/favorites", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newOrder }),
          });
        } catch (err) {
          setError(err.message);
        }
      },
    });

    return () => sortable.destroy();
  }, [favorites, setError, setFavorites]);

  return (
    <div className="mt-6 bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-4 w-full">
      <h3 className="text-lg font-bold mb-2">Favorites</h3>

      <ul ref={listRef} className="flex flex-col space-y-2 max-h-36 overflow-y-auto">
        {favorites.map((fav) => (
          <li
            key={fav}
            className="flex justify-between items-center flex-1 text-left p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 w-[95%]"
          >
            <p className="bg-gray-300 pt-0 pb-1 mr-2 cursor-grab text-black h-5 w-6 flex justify-center items-center rounded-md tracking-tight">
              : :
            </p>
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
