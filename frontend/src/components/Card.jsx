const Card = ({ meal }) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 mb-5">
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
        </div>
      </div>
    </>
  );
};

export default Card;
