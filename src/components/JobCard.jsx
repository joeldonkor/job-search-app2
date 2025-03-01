import React from 'react';

function JobCard({ data }) {
  return (
    <div className="mt-4 w-full max-w-2xl">
      {data && data.jobs && data.jobs.length > 0 ? (
        data.jobs.map((job) => (
          <div key={job.id} className="p-4 mb-2 shadow-md rounded-md">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.employmentType}</p>
            <p className="text-gray-600">Posted {job.timeAgoPosted}</p>
            {/* <p className="text-gray-600">{job.description}</p> */}
          </div>
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobCard;