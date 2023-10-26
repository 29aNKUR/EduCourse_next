import React from 'react';

const shimmer = () => {
  return (
    <div className="course-card w-72 h-36 bg-white rounded-lg shadow-md overflow-hidden m-4 relative">
      <div className="shimmer w-full h-full animate-shimmer"></div>
      <div className="course-info">
        <div className="shimmer w-3/4 h-4 mt-2 mb-2 animate-shimmer"></div>
        <div className="shimmer w-2/4 h-4 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default shimmer;
