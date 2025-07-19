import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import LoadingIndicator from "../components/LoadingIndicator.jsx";

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (err) {
        setError("Failed to fetch meal details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  // Collect ingredients and measures
  const getIngredients = (mealObj) => {
    if (!mealObj) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealObj[`strIngredient${i}`];
      const measure = mealObj[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  return (
    <MainLayout>
      {loading && <LoadingIndicator message="Loading meal details..." />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && meal && (
        <div className="max-w-3xl mx-auto bg-gray-800 rounded shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-white">{meal.strMeal}</h1>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full max-w-md mx-auto rounded mb-4"
          />
          <div className="mb-4">
            <span className="font-semibold text-blue-400">Category:</span>{" "}
            {meal.strCategory}
            {" | "}
            <span className="font-semibold text-blue-400">Area:</span>{" "}
            {meal.strArea}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-blue-400">Ingredients:</span>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              {getIngredients(meal).map((item, idx) => (
                <li key={idx}>
                  {item.ingredient} {item.measure && `- ${item.measure}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-blue-400">Instructions:</span>
            <p className="text-gray-300 mt-2 whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </div>
          {meal.strYoutube && (
            <div className="mb-4">
              <span className="font-semibold text-blue-400">Video:</span>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline ml-2"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      )}
      {!loading && !meal && !error && (
        <p className="text-center">Meal not found.</p>
      )}
    </MainLayout>
  );
}
