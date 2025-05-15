import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-6">Welcome to Cinema App</h1>
      <p className="text-lg mb-8 max-w-xl text-center">
        This is a simple React application configured with TailwindCSS.
      </p>
      <button className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition">
        Explore Movies
      </button>
    </div>
  );
}
