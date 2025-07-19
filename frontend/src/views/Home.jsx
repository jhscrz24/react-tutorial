import MainLayout from "../layouts/MainLayout.jsx";
import SearchForm from "../components/SearchForm.jsx";
import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function Home() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(""); // error state
  const [heading, setHeading] = useState("Random Meals");
  const [loading, setLoading] = useState(false); // loading state

  // Move fetchRandomMeals outside useEffect
  const fetchRandomMeals = async () => {
    try {
      setError(""); // reset error
      setLoading(true);
      setHeading("Random Meals");
      const requests = Array.from({ length: 8 }, () =>
        fetch(`${API_BASE_URL}/random.php`).then((res) => res.json())
      );
      const results = await Promise.all(requests);
      const randomMeals = results.map((r) => r.meals[0]);
      setMeals(randomMeals);
    } catch (error) {
      setError("Error fetching random meals.");
      setMeals([]);
      console.error("Error fetching random meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch 8 random meals on mount
  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);

    if (!query) {
      setHeading("Random Meals");
      fetchRandomMeals(); // Fetch random meals if no query
      return;
    }

    setError(""); // reset error
    setLoading(true);
    setHeading(`Search Results for "${query}"`);
    setMeals([]); // reset meals
    try {
      const url = `${API_BASE_URL}/search.php?s=${query}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals || []);
        })
        .catch((error) => {
          setError("Error fetching search results.");
          setMeals([]);
          console.error("Error fetching search results:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setError("Error fetching meals.");
      setMeals([]);
      setLoading(false);
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <MainLayout>
      <SearchForm
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      <h1 className="text-2xl font-bold my-4">{heading}</h1>

      {loading && <LoadingIndicator message="Loading meals..." />}

      {error && (
        <p className="text-center" style={{ color: "red" }}>
          {error}
        </p>
      )}

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
