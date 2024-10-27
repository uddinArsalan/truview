import React from "react";

const Loader = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loader;
