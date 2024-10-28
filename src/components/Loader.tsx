import React from "react";

const Loader = () => {
  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-white min-h-screen"
    aria-label="Loading"
  >
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-primary"></div>
  </div>
  );
};

export default Loader;
