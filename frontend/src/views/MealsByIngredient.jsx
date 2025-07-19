import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function MealsByIngredient() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${API_BASE_URL}/filter.php?i=${encodeURIComponent(name)}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        setError("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [name]);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Meals with "{name}"</h1>
      {loading && <LoadingIndicator message="Loading meals..." />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && meals.length === 0 && !error && (
        <p className="text-center">No Meals Found</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!loading &&
          meals.map((meal) => <Card key={meal.idMeal} meal={meal} />)}
      </div>
    </MainLayout>
  );
}
