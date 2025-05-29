import  { Users, DollarSign, Briefcase } from 'lucide-react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { employees } = useEmployeeContext();
  
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const departments = [...new Set(employees.map(emp => emp.department))];
  
  // Get average salary per department
  const departmentSalaries = departments.map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept);
    const avgSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length;
    return { department: dept, avgSalary, count: deptEmployees.length };
  }).sort((a, b) => b.count - a.count);
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Employees</h3>
            <p className="text-2xl font-bold">{totalEmployees}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Salary</h3>
            <p className="text-2xl font-bold">${totalSalary.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Briefcase className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Departments</h3>
            <p className="text-2xl font-bold">{departments.length}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-lg shadow p-6 md:w-2/3">
          <h2 className="text-lg font-semibold mb-4">Department Overview</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Salary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentSalaries.map((dept, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dept.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dept.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${dept.avgSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 md:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Employees</h2>
            <Link to="/employees" className="text-primary-600 text-sm hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {employees.slice(-3).reverse().map(employee => (
              <div key={employee.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  {employee.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">About Java JDBC Employee Management System</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1559192823-e1d8e87def54?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMG1hbmFnZW1lbnQlMjBkYXRhYmFzZSUyMHN5c3RlbXxlbnwwfHx8fDE3NDg0NjYzMjJ8MA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800" 
                alt="Employee management system" 
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">
                This web interface demonstrates the functionality of our Java-based Employee Management System. The backend is built with Java, JDBC, and MySQL, providing robust data management capabilities.
              </p>
              <p className="text-gray-700 mb-4">
                The system allows for complete employee data management including adding new employees, viewing all employee records, searching by ID, updating employee information, and removing employees from the database.
              </p>
              <p className="text-gray-700">
                <strong>Technologies:</strong> Java, JDBC, MySQL, React, TypeScript, Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 