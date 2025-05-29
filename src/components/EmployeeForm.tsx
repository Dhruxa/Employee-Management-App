import  { useState, useEffect } from 'react';
import { Employee, NewEmployee } from '../types/Employee';

interface EmployeeFormProps {
  initialValues?: Employee;
  onSubmit: (employee: NewEmployee | Partial<Employee>) => void;
  buttonText: string;
}

export default function EmployeeForm({ initialValues, onSubmit, buttonText }: EmployeeFormProps) {
  const [formValues, setFormValues] = useState<NewEmployee>({
    name: '',
    email: '',
    department: '',
    salary: 0
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof NewEmployee, string>>>({});
  
  useEffect(() => {
    if (initialValues) {
      setFormValues({
        name: initialValues.name,
        email: initialValues.email,
        department: initialValues.department,
        salary: initialValues.salary
      });
    }
  }, [initialValues]);
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof NewEmployee, string>> = {};
    
    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formValues.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (formValues.salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="department" className="block text-gray-700 font-medium mb-2">
          Department
        </label>
        <select
          id="department"
          name="department"
          value={formValues.department}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.department ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500`}
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
          Salary
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formValues.salary}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.salary ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500`}
        />
        {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
      </div>
      
      <button
        type="submit"
        className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </form>
  );
}
 