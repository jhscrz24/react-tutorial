import "./App.css";
import MainLayout from "./layouts/MainLayout.jsx";
import SearchForm from "./components/SearchForm.jsx";
import { useState } from "react";
import Card from "./components/Card.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  const handleSearch = (query) => {
    console.log("Search query:", query);

    // Fetch data from an API or perform search logic here
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
    setSearch(query);
    console.log("Search state updated:", query);
  };

  return (
    <MainLayout>
      <SearchForm
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      {meals.length === 0 && <p className="text-center">No Meals Found</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <Card key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </MainLayout>
  );
}

export default App;
