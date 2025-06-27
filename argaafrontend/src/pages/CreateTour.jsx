// src/pages/CreateTour.jsx
import React, { useState } from "react";

export default function CreateTour() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    durationHours: "",
    price: "",
    maxGroupSize: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission to backend
    console.log("Tour Created:", form);
    // Clear form or show success message after submit
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Create New Tour</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter tour title"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the tour"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="durationHours" className="block mb-1 font-medium">Duration (hours)</label>
            <input
              type="number"
              id="durationHours"
              name="durationHours"
              value={form.durationHours}
              onChange={handleChange}
              placeholder="e.g., 5"
              min="1"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g., 100"
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="maxGroupSize" className="block mb-1 font-medium">Max Group Size</label>
            <input
              type="number"
              id="maxGroupSize"
              name="maxGroupSize"
              value={form.maxGroupSize}
              onChange={handleChange}
              placeholder="e.g., 20"
              min="1"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        >
          Create Tour
        </button>
      </form>
    </div>
  )
}