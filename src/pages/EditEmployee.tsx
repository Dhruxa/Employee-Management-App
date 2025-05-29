import  { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Employee } from '../types/Employee';

export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const { getEmployeeById, updateEmployee } = useEmployeeContext();
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
  
  const handleSubmit = (updatedEmployee: Partial<Employee>) => {
    updateEmployee(employeeId, updatedEmployee);
    navigate(`/employee/${employeeId}`);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>
          <p className="text-gray-600 mb-6">
            Update the details for {employee.name}. Leave fields unchanged if you don't want to update them.
          </p>
          
          <EmployeeForm
            initialValues={employee}
            onSubmit={handleSubmit}
            buttonText="Update Employee"
          />
        </div>
      </div>
    </div>
  );
}
 