import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import JobSearch from './JobSearch';
import JobCard from './JobCard';

function JobContainer() {
  const [query, setQuery] = useState({
    search: 'Web Developer',
    location: 'United States',
  });

  const options = {
    method: 'GET',
    url: 'https://jobs-api14.p.rapidapi.com/v2/list',
    params: {
      query: query.search,
      location: query.location,
      autoTranslateLocation: 'true',
      remoteOnly: 'false',
      employmentTypes: 'fulltime;parttime;intern;contractor',
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
    onError: () => {
      console.log('Using local data as fallback');
    },
  });

  // Retrieve data from localStorage if API fails
  const jobs = isError ? JSON.parse(localStorage.getItem('jobsData')) : data;

  // Memoize the handleSearchChange function to prevent unnecessary re-renders
  const handleSearchChange = useCallback((newQuery) => {
    setQuery(newQuery); // Update query state
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <JobSearch onSearchChange={handleSearchChange} className="" />
      </div>
      {isLoading && <p>Loading...</p>}
      {jobs && <JobCard className="" data={jobs} />}
    </div>
  );
}

export default JobContainer;