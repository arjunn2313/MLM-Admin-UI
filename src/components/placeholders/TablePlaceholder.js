// src/components/TablePlaceholder.js
import React from 'react';

const TablePlaceholder = () => {
  return (
    <div className="w-full p-4">
      <div className="border border-gray-300 shadow rounded-md p-4 max-w-full w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePlaceholder;
