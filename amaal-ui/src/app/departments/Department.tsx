// src/components/Department.tsx

import React from "react";

interface DepartmentProps {
  department: {
    name: string;
    subjects: string[];
  };
}

const Department: React.FC<DepartmentProps> = ({ department }) => {
  if (!department || !department.subjects) {
    return <div>Loading department details...</div>; // Placeholder for loading state
  }

  return (
    <div>      
      <h2 className="text-4xl font-extrabold dark:text-white">{department.name}</h2>
      <ul>
        {department.subjects.map((subject, index) => (
          <li key={index}>{subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default Department;
