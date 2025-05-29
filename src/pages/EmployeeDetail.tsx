import  { useParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Building, DollarSign, User, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useEmployeeContext } from '../context/EmployeeContext';

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const { getEmployeeById, deleteEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  
  const employeeId = parseInt(id || '0');
  const employee = getEmployeeById(employeeId);
  
  if (!employee) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Employee Not Found</h2>
        <p className="text-gray-600 mb-4">
          The employee with ID {employeeId} could not be found.
        </p>
        <button
          onClick={() => navigate('/employees')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Back to Employee List
        </button>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      deleteEmployee(employeeId);
      navigate('/employees');
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Link 
        to="/employees" 
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Employee List
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-primary-700 text-white p-6 flex flex-col items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-primary-700 text-4xl font-bold mb-4">
              {employee.name.charAt(0)}
            </div>
            <h2 className="text-xl font-semibold mb-1">{employee.name}</h2>
            <p className="text-primary-200 mb-3">{employee.department}</p>
            <div className="flex space-x-3 mt-2">
              <Link 
                to={`/edit-employee/${employee.id}`} 
                className="p-2 bg-primary-600 rounded-full hover:bg-primary-800"
              >
                <Edit className="h-5 w-5" />
              </Link>
              <button 
                onClick={handleDelete} 
                className="p-2 bg-red-600 rounded-full hover:bg-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Employee Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Employee ID</p>
                  <p className="text-sm text-gray-500">{employee.id}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Email Address</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Building className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Department</p>
                  <p className="text-sm text-gray-500">{employee.department}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Salary</p>
                  <p className="text-sm text-gray-500">${employee.salary.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-3">Actions</h4>
              <div className="flex space-x-3">
                <Link 
                  to={`/edit-employee/${employee.id}`} 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Employee
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 