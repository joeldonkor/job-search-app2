import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useDebounce } from 'use-debounce'; // Install this library for debouncing

function JobSearch({ onSearchChange }) {
  const [search, setSearch] = useState('Web Developer');
  const [location, setLocation] = useState('United States');
  const [debouncedSearch] = useDebounce(search, 500); // Debounce search input
  const [debouncedLocation] = useDebounce(location, 500); // Debounce location input

  useEffect(() => {
    // Trigger search when debounced values change
    onSearchChange({ search: debouncedSearch, location: debouncedLocation });
  }, [debouncedSearch, debouncedLocation, onSearchChange]);

  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg shadow-md">
      <div className="flex items-center p-2 rounded-lg">
        <CiSearch className="text-2xl" />
        <input
          type="search"
          placeholder="Job title or keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-60 px-4 py-2 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4 p-2 rounded-lg">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-60 px-4 py-2 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>United States</option>
          <option>Accra</option>
          <option>Kumasi</option>
          <option>London</option>
          <option>Canada</option>
        </select>

        <button
          className="w-32 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default JobSearch;