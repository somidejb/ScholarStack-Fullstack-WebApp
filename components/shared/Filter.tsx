import React, { useState } from 'react';

const Filter = ({ title, items }: { title: string, items: any[] }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <ul>
        {items.slice(0, showMore ? items.length : 4).map((item, index) => (
          <li key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                defaultChecked={item.checked}
              />
              <span className="ml-2">{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
      {items.length > 4 && (
        <a href="#" className="text-blue-600" onClick={handleShowMore}>
          {showMore ? 'See less...' : 'See more...'}
        </a>
      )}
    </div>
  );
};

export default Filter;
