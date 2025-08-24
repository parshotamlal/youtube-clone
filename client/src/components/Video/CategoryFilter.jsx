import React from 'react';
import { categories } from '../../data/dummyData';
import { useVideo } from '../../contexts/VideoContext';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useVideo();

  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-3 pb-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;