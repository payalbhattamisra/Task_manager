 // CategorySlider.jsx
import React from 'react';

function CategorySlider({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-slider">
      {categories.map((category) => (
        <button
          key={category}
          className={category === selectedCategory ? 'selected' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategorySlider;
