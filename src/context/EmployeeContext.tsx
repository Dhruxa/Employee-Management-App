import  { createContext, useState, ReactNode, useContext } from 'react';
import { Employee, NewEmployee } from '../types/Employee';

// Mock data
const initialEmployees: Employee[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Marketing', salary: 75000 },
  { id: 3, name: 'Michael Johnson', email: 'michael.j@example.com', department: 'HR', salary: 65000 },
  { id: 4, name: 'Emily Brown', email: 'emily.b@example.com', department: 'Finance', salary: 90000 },
  { id: 5, name: 'Robert Wilson', email: 'robert.w@example.com', department: 'Sales', salary: 80000 },
];

interface EmployeeContextType {
  employees: Employee[];
  getEmployeeById: (id: number) => Employee | undefined;
  addEmployee: (employee: NewEmployee) => void;
  updateEmployee: (id: number, updatedEmployee: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const getEmployeeById = (id: number) => {
    return employees.find(employee => employee.id === id);
  };

  const addEmployee = (employee: NewEmployee) => {
    const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    setEmployees([...employees, { ...employee, id: newId }]);
  };

  const updateEmployee = (id: number, updatedEmployee: Partial<Employee>) => {
    setEmployees(
      employees.map(employee => 
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ 
      employees, 
      getEmployeeById, 
      addEmployee, 
      updateEmployee, 
      deleteEmployee 
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
 