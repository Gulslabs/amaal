// src/components/DepartmentsList.tsx
"use client";
import React, { useEffect, useState } from "react";
import Department from "./Department";

interface Department {
  name: string;
  subjects: string[];
}

const DepartmentsList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);
  const fetchDepartments = async () => {
    try {
      const response = await fetch("/departments.json");
      const data: Department[] = await response.json();
      console.log("Fetched departments:", data); // Debugging line
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading departments...</div>;
  }

  return (
    <div>
      <div className="flex items-start justify-center pt-2">
        <h1 className="text-4xl font-bold">Department Details</h1>
      </div>
      {departments.map((department, index) => (
        <Department key={index} department={department} />
      ))}
    </div>
  );
};

export default DepartmentsList;
