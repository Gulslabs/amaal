'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import Employee from './Employee';

interface EmployeeType {
  id: number;
  name: string;
  date: string;
}

const EmployeeList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
    console.log(`Fetch Employees called `);
      const response = await fetch("/employee.json");
      const data: EmployeeType[] = await response.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, [selectedDate]);

  return (
    <div>
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <div>
        {employees.map(employee => (
          <Employee key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
