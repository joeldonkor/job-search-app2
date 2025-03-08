import React, { useState } from 'react';

function JobFilter({ onFilterChange }) {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Job roles and types for the filter options
  const jobRoles = ['Front-end Developer', 'Back-end Developer', 'Fullstack Developer', 'DevOps Engineer'];
  const jobTypes = ['Full-time', 'Part time', 'Intern', 'Contractor'];

  // Handle role selection
  const handleRoleChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role) // Remove role if already selected
      : [...selectedRoles, role]; // Add role if not selected
    setSelectedRoles(updatedRoles);
    onFilterChange({ roles: updatedRoles, types: selectedTypes });
  };

  // Handle type selection
  const handleTypeChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type) // Remove type if already selected
      : [...selectedTypes, type]; // Add type if not selected
    setSelectedTypes(updatedTypes);
    onFilterChange({ roles: selectedRoles, types: updatedTypes });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>

      {/* Job Roles Filter */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">Job Roles</h4>
        <div className="space-y-2">
          {jobRoles.map((role) => (
            <label key={role} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => handleRoleChange(role)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Types Filter */}
      <div>
        <h4 className="text-md font-medium mb-2">Job Types</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobFilter;