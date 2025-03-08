

import React from 'react';

function JobDescription({ job }) {
  return (
    <div className="p-4 shadow-md rounded-md ">
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-[#E4E5E6]">{job.company}</p>
        <p className="text-gray-600 dark:text-[#E4E5E6]">{job.location}</p>
        <p className="text-gray-600 dark:text-[#E4E5E6]">{job.employmentType}</p>
        <p className="text-gray-600 dark:text-[#E4E5E6]">Posted {job.timeAgoPosted}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 ">Job Description</h3>
        <p className="text-gray-600 dark:text-[#E4E5E6]">{job.description}</p>
      </div>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-175 mt-5">
           Apply
       </button>
    </div>
  );
}

export default JobDescription;