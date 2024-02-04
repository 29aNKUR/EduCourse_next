import React from 'react';

const Shimmer = () => {
  const shimmerCards = Array.from({ length: 2 }, (_, index) => (
    <div key={index} className={`course-card w-full md:w-72 h-72 bg-white rounded-lg shadow-md overflow-hidden m-4 relative`}>
      <div className="shimmer-container w-full h-full animate-shimmer">
        <div className="shimmer-overlay"></div>
      </div>
      <div className="course-info">
        <div className="shimmer w-full md:w-3/4 h-4 mt-2 mb-2 animate-shimmer"></div>
        <div className="shimmer w-full md:w-2/4 h-4 animate-shimmer"></div>
      </div>
    </div>
  ));

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">{shimmerCards}</div>
    </div>
  );
};

export default Shimmer;
