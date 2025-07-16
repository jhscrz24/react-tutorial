import "./App.css";
import MainLayout from "./layouts/MainLayout.jsx";
import SearchForm from "./components/SearchForm.jsx";
import Card from "./components/Card.jsx";

function App() {
  return (
    <MainLayout>
      <SearchForm />
      <Card
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
        title="Grilled Chicken Salad"
        desc="A healthy and delicious grilled chicken salad with fresh greens, cherry tomatoes, and a light vinaigrette."
      />
    </MainLayout>
  );
}

export default App;
