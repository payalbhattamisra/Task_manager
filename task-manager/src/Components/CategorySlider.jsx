import React from 'react';

const CategorySlider = ({ categories }) => {
  return (
    <div className="category-slider">
      {categories && categories.map((category, index) => (
        <button key={index}>{category}</button>
      ))}
    </div>
  );
};
export default CategorySlider;
