import React from 'react';
interface EmployeeProps {
  employee: {
    id: number;
    name: string;
    date: string;
  };
}

const Employee: React.FC<EmployeeProps> = ({ employee }) => {
  return (
    <div>
      <h3>{employee.name}</h3>
      <p>{employee.date}</p>
    </div>
  );
};

export default Employee;
