import  { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { useEmployeeContext } from '../context/EmployeeContext';
import { NewEmployee } from '../types/Employee';

export default function AddEmployee() {
  const { addEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  
  const handleSubmit = (employee: NewEmployee) => {
    addEmployee(employee);
    navigate('/employees');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>
          <p className="text-gray-600 mb-6">
            Enter the details of the new employee below. All fields are required.
          </p>
          
          <EmployeeForm
            onSubmit={handleSubmit}
            buttonText="Add Employee"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
              <h3 className="text-lg font-semibold mb-2">Welcome to Our Team</h3>
              <p className="text-gray-600 mb-4">
                Adding a new employee is the first step in growing our team. Make sure to provide 
                accurate information to ensure smooth onboarding.
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Complete all required fields</li>
                <li>Verify email address is correct</li>
                <li>Select the appropriate department</li>
                <li>Enter the agreed salary amount</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1576267423429-569309b31e84?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxlbXBsb3llZSUyMG1hbmFnZW1lbnQlMjBkYXRhYmFzZSUyMHN5c3RlbXxlbnwwfHx8fDE3NDg0NjYzMjJ8MA&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800" 
                alt="Employee onboarding" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 