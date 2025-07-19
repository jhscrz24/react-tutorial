import { Link } from "react-router-dom";

const Card = ({ meal }) => {
  return (
    <Link to={`/meal/${meal.idMeal}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 mb-5 hover:ring-2 hover:ring-blue-400 transition">
        <img
          className="w-full h-48 object-cover"
          src={meal.strMealThumb}
          alt="Meals"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-white">
            {meal.strMeal}
          </div>
          <p className="text-gray-300 text-base">
            {meal.strInstructions?.slice(0, 100)}
          </p>
          {/* Add YouTube button if link exists */}
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              onClick={(e) => e.stopPropagation()} // Prevent card navigation
            >
              Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
