import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home.jsx";
import Ingredients from "./views/Ingredients.jsx";
import MealsByIngredient from "./views/MealsByIngredient.jsx"; // Add import
import MealDetails from "./views/MealDetails.jsx"; // Add import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/ingredient/:name" element={<MealsByIngredient />} />{" "}
      {/* Add route */}
      <Route path="/meal/:id" element={<MealDetails />} /> {/* Add route */}
    </Routes>
  );
}

export default App;
