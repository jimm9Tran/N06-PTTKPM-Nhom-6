import React, { useState, useEffect } from 'react';

const SearchBar = ({ keyword, onSearch }) => {
  const [input, setInput] = useState(keyword);

  // Cập nhật giá trị input khi keyword bên ngoài thay đổi
  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex">
      <input 
        type="text"
        placeholder="Tìm kiếm..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
      >
        Tìm kiếm
      </button>
    </form>
  );
};

export default SearchBar;