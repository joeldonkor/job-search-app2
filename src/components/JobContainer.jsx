


import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import JobSearch from './JobSearch';
import JobCard from './JobCard';
import JobFilter from './JobFilter';
import Pagination from './Pagination';

function JobContainer() {
  const [query, setQuery] = useState({
    search: 'Web Developer',
    location: 'United States',
    roles: [], // Added for job roles filter
    types: [], // Added for job types filter
    page: 1, // Added for pagination
    nextPage: null, // Added to track the next page token
  });

  const itemsPerPage = 4 ; // Number of items per page

  const options = {
    method: 'GET',
    url: 'https://jobs-api14.p.rapidapi.com/v2/list',
    params: {
      query: query.search,
      location: query.location,
      autoTranslateLocation: 'true',
      remoteOnly: 'false',
      employmentTypes: query.types.join(';'), // Convert array to semicolon-separated string
      page: query.nextPage || query.page, // Use nextPage token if available
    },
    headers: {
      'x-rapidapi-key': '5d6cb7818emsh7cd1b85b95b6c46p1fd540jsn5e53fd694e37',
      'x-rapidapi-host': 'jobs-api14.p.rapidapi.com',
    },
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['job', query], // Include query in the queryKey to refetch when query changes
    queryFn: () =>
      Axios.request(options)
        .then((res) => {
          // Save data to localStorage
          localStorage.setItem('jobsData', JSON.stringify(res.data));
          return res.data;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          throw error;
        }),
    enabled: !!query.search || !!query.location, // Enable query only if search or location is provided
    refetchOnWindowFocus: false, // Disable refetch on window focus
    onError: () => {
      console.log('Using local data as fallback');
    },
  });

  // Retrieve data from localStorage if API fails
  const jobs = isError ? JSON.parse(localStorage.getItem('jobsData')) : data;

  // Memoize the handleSearchChange function to prevent unnecessary re-renders
  const handleSearchChange = useCallback((newQuery) => {
    setQuery((prev) => ({ ...prev, ...newQuery, page: 1, nextPage: null })); // Reset to page 1 on new search
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    setQuery((prev) => ({ ...prev, ...filters, page: 1, nextPage: null })); // Reset to page 1 on new filter
  }, []);

  // Filter jobs based on roles and types
  const filteredJobs = jobs?.jobs?.filter((job) => {
    const matchesRole = query.roles.length === 0 || query.roles.includes(job.title);
    const matchesType = query.types.length === 0 || query.types.includes(job.employmentType);
    return matchesRole && matchesType;
  });

  // Pagination logic
  const totalJobs = jobs?.jobCount || 0; // Use jobCount from the API response
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  const startIndex = (query.page - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs?.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  // Handle next page using the nextPage token
  const handleNextPage = () => {
    if (jobs?.nextPage) {
      setQuery((prev) => ({ ...prev, nextPage: jobs.nextPage, page: prev.page + 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center">
          <JobSearch onSearchChange={handleSearchChange} className="" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Job Filters */}
          <div className="md:col-span-1">
            <JobFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Job Listings */}
          <div className="md:col-span-3">
            {isLoading && <p>Loading...</p>}
            {paginatedJobs && <JobCard className="" data={{ jobs: paginatedJobs }} />}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={query.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNextPage={handleNextPage}
            hasNextPage={!!jobs?.nextPage} // Pass whether there's a next page
          />
        </div>
      </div>
    </div>
  );
}

export default JobContainer;