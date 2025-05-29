import  { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Plus, Home, Database } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-primary-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center">
            <Database className="mr-2" size={24} />
            EMS
          </h1>
          <p className="text-sm text-primary-200 mt-1">Employee Management System</p>
        </div>
        
        <nav className="mt-6">
          <ul>
            <li>
              <Link 
                to="/" 
                className={`flex items-center px-4 py-3 ${
                  location.pathname === '/' ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
              >
                <Home className="mr-3" size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/employees" 
                className={`flex items-center px-4 py-3 ${
                  location.pathname === '/employees' ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
              >
                <Users className="mr-3" size={18} />
                Employees
              </Link>
            </li>
            <li>
              <Link 
                to="/add-employee" 
                className={`flex items-center px-4 py-3 ${
                  location.pathname === '/add-employee' ? 'bg-primary-700' : 'hover:bg-primary-700'
                }`}
              >
                <Plus className="mr-3" size={18} />
                Add Employee
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === '/' && 'Dashboard'}
              {location.pathname === '/employees' && 'Employee List'}
              {location.pathname === '/add-employee' && 'Add New Employee'}
              {location.pathname.startsWith('/edit-employee/') && 'Edit Employee'}
              {location.pathname.startsWith('/employee/') && 'Employee Details'}
            </h2>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
 