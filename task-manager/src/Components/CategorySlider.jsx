import React, { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext.jsx';

function CategorySlider() {
  const { categories, setCategory } = useContext(TaskContext);

  return (
    <div className="category-slider">
      {categories.map((category) => (
        <button key={category} onClick={() => setCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategorySlider;
