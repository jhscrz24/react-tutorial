import { Link, NavLink } from "react-router-dom";

const Header = () => (
  <nav className="bg-gray-800 px-6 py-4 shadow-md">
    <div className="container mx-auto flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        MealSearch
      </Link>
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-semibold"
              : "text-white hover:text-blue-400 font-semibold transition"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/ingredients"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-semibold"
              : "text-white hover:text-blue-400 font-semibold transition"
          }
        >
          Ingredients
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Header;
