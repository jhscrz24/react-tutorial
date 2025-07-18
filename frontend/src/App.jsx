import "./App.css";
import MainLayout from "./layouts/MainLayout.jsx";
import SearchForm from "./components/SearchForm.jsx";
import { useState } from "react";

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
        console.log("Search results:", data);
        // Handle the search results as needed
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
    </MainLayout>
  );
}

export default App;
