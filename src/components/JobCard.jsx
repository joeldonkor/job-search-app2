

import React, { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import JobDescription from './JobDescription'; // Import the JobDescription component
import { MdArrowBack } from 'react-icons/md';
import { CiMenuFries } from "react-icons/ci";

function JobCard({ data }) {
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job
  const [showBookmarked, setShowBookmarked] = useState(false); // Track whether to show bookmarked jobs
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]); // Track bookmarked jobs

  // Load bookmarked jobs from sessionStorage on component mount
  useEffect(() => {
    const storedJobs = JSON.parse(sessionStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(storedJobs);
  }, []);

  // Handle job card click
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedJob(null);
  };

  // Handle bookmark click
  const handleBookmarkClick = (job) => {
    const isBookmarked = bookmarkedJobs.some((bookmarkedJob) => bookmarkedJob.id === job.id);

    let updatedBookmarks;
    if (isBookmarked) {
      // Remove the job from bookmarks
      updatedBookmarks = bookmarkedJobs.filter((bookmarkedJob) => bookmarkedJob.id !== job.id);
    } else {
      // Add the job to bookmarks
      updatedBookmarks = [...bookmarkedJobs, job];
    }

    // Update state and sessionStorage
    setBookmarkedJobs(updatedBookmarks);
    sessionStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
  };

  // Toggle the display of bookmarked jobs
  const toggleBookmarkedJobs = () => {
    setShowBookmarked((prev) => !prev);
  };

  return (
    <div className="mt-4 w-full">
      {/* Menu Button */}
      <div className="flex justify-end mb-4">
        <CiMenuFries
          onClick={toggleBookmarkedJobs}
          className="text-4xl cursor-pointer border-2 border-white p-1 rounded-md bg-white text-[#FE753F] shadow-md dark:bg-gray-800 dark:border-gray-800 dark:text-[#FE753F]"
        >
          {showBookmarked ? 'Show All Jobs' : 'Show Bookmarked Jobs'}
        </CiMenuFries>
      </div>

      {selectedJob ? (
        // Render the JobDescription component with a Back button
        <div>
          <MdArrowBack onClick={handleBackClick} className="text-2xl cursor-pointer" />
          <JobDescription job={selectedJob} />
        </div>
      ) : (
        // Render the list of job cards or bookmarked jobs
        <>
          {showBookmarked ? (
            // Render bookmarked jobs
            <>
              {bookmarkedJobs.length > 0 ? (
                bookmarkedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 mb-2 shadow-md rounded-md grid grid-cols-4 gap-4 cursor-pointer"
                    onClick={() => handleJobClick(job)}
                  >
                    <div>
                      <img src={job.image} alt="Company Logo" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{job.title}</h2>
                      <div>
                        <p className="text-gray-600 dark:text-[#E4E5E6]">{job.company}</p>
                        <p className="text-gray-600 dark:text-[#E4E5E6]">Posted {job.timeAgoPosted}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-[#E4E5E6]">{job.location}</p>
                      <p className="text-gray-600 dark:text-[#E4E5E6]">{job.employmentType}</p>
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkClick(job);
                        }}
                      >
                        {bookmarkedJobs.some((bookmarkedJob) => bookmarkedJob.id === job.id) ? (
                          <FaBookmark className="text-indigo-600" />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No bookmarked jobs found.</p>
              )}
            </>
          ) : (
            // Render all jobs
            <>
              {data && data.jobs && data.jobs.length > 0 ? (
                data.jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 mb-2 shadow-md rounded-md grid grid-cols-4 gap-4 cursor-pointer"
                    onClick={() => handleJobClick(job)}
                  >
                    <div>
                      <img src={job.image} alt="Company Logo" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{job.title}</h2>
                      <div>
                        <p className="text-gray-600 dark:text-[#E4E5E6]">{job.company}</p>
                        <p className="text-gray-600 dark:text-[#E4E5E6]">Posted {job.timeAgoPosted}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-[#E4E5E6]">{job.location}</p>
                      <p className="text-gray-600 dark:text-[#E4E5E6]">{job.employmentType}</p>
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkClick(job);
                        }}
                      >
                        {bookmarkedJobs.some((bookmarkedJob) => bookmarkedJob.id === job.id) ? (
                          <FaBookmark className="text-indigo-600" />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No jobs found.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default JobCard;