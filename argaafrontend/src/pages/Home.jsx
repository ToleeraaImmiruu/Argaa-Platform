// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the ARGAA Tourism Platform</h1>
      <p className="text-gray-600 mb-6">Explore and book amazing tours across Oromia and Ethiopia.</p>
      <Link
        to="/tours"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Tours
      </Link>
    </div>
  );
}
