const Card = ({ image, title = "Unknown Meal", desc }) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 mb-5">
        <img className="w-full h-48 object-cover" src={image} alt="Meals" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-white">{title}</div>
          <p className="text-gray-300 text-base">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
