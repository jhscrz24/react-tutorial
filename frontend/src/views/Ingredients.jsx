import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import { Link } from "react-router-dom"; // Add Link

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/list.php?i=list`);
        const data = await res.json();
        setIngredients(data.meals || []);
      } catch (err) {
        setError("Failed to fetch ingredients.");
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
      {loading && <LoadingIndicator message="Loading ingredients..." />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ingredients.map((ingredient) => (
          <Link
            key={ingredient.idIngredient}
            to={`/ingredient/${encodeURIComponent(ingredient.strIngredient)}`}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 mb-5 p-4 hover:ring-2 hover:ring-blue-400 transition"
          >
            <img
              src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
              alt={ingredient.strIngredient}
              className="w-full h-32 object-contain mb-2"
            />
            <div className="font-bold text-xl mb-2 text-white">
              {ingredient.strIngredient}
            </div>
            <p className="text-gray-300 text-base">
              {ingredient.strDescription
                ? ingredient.strDescription.slice(0, 100) + "..."
                : "No description available."}
            </p>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}
