import React from "react";

const Portfolio = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">My Portfolio</h1>
      <p className="text-lg mb-6">Check out my CV and download it below!</p>
      <a
        href="/cv.pdf" // This points to the CV file in the public folder
        download="My_CV.pdf" // The name of the file when downloaded
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Download CV
      </a>
    </div>
  );
};

export default Portfolio;
