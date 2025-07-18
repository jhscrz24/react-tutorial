import { useEffect, useRef, useState } from "react";

const SearchForm = ({ search, setSearch, onSearch }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto mb-8"
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-l bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        placeholder="Search for meals..."
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-r bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
