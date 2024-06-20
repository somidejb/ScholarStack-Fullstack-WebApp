// components/shared/NoActiveListings.tsx
import React from 'react';

const NoActiveListings: React.FC = () => {
  return (
    <div className="text-center py-10">
      <h3 className="text-lg font-bold mb-2">You don't have any active listings</h3>
      <p className="text-gray-600">Add a new listing to start selling your books.</p>
    </div>
  );
};

export default NoActiveListings;
