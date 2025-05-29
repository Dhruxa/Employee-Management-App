package  com.ems.main;

import com.ems.dao.EmployeeDAO;
import com.ems.model.Employee;

import java.util.List;
import java.util.Scanner;

public class EmployeeManagementSystem {
    private static Scanner scanner = new Scanner(System.in);
    private static EmployeeDAO employeeDAO = new EmployeeDAO();

    public static void main(String[] args) {
        System.out.println("\n===== EMPLOYEE MANAGEMENT SYSTEM =====\n");
        
        boolean exit = false;
        while (!exit) {
            displayMenu();
            int choice = getChoice();
            
            switch (choice) {
                case 1:
                    addEmployee();
                    break;
                case 2:
                    viewAllEmployees();
                    break;
                case 3:
                    searchEmployee();
                    break;
                case 4:
                    updateEmployee();
                    break;
                case 5:
                    deleteEmployee();
                    break;
                case 6:
                    exit = true;
                    employeeDAO.close();
                    System.out.println("Thank you for using Employee Management System!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
        scanner.close();
    }

    private static void displayMenu() {
        System.out.println("\n1. Add Employee");
        System.out.println("2. View All Employees");
        System.out.println("3. Search Employee by ID");
        System.out.println("4. Update Employee");
        System.out.println("5. Delete Employee");
        System.out.println("6. Exit");
        System.out.print("\nEnter your choice: ");
    }

    private static int getChoice() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private static void addEmployee() {
        System.out.println("\n----- Add New Employee -----");
        
        System.out.print("Enter name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        
        System.out.print("Enter department: ");
        String department = scanner.nextLine();
        
        System.out.print("Enter salary: ");
        double salary = 0;
        try {
            salary = Double.parseDouble(scanner.nextLine());
        } catch (NumberFormatException e) {
            System.out.println("Invalid salary format. Using default value 0.");
        }
        
        Employee emp = new Employee(name, email, department, salary);
        if (employeeDAO.addEmployee(emp)) {
            System.out.println("Employee added successfully!");
        } else {
            System.out.println("Failed to add employee.");
        }
    }

    private static void viewAllEmployees() {
        System.out.println("\n----- All Employees -----");
        List<Employee> employees = employeeDAO.getAllEmployees();
        
        if (employees.isEmpty()) {
            System.out.println("No employees found.");
        } else {
            displayTableHeader();
            for (Employee emp : employees) {
                System.out.println(emp);
            }
            displayTableFooter();
            System.out.println("Total employees: " + employees.size());
        }
    }

    private static void searchEmployee() {
        System.out.println("\n----- Search Employee -----");
        System.out.print("Enter employee ID: ");
        
        try {
            int id = Integer.parseInt(scanner.nextLine());
            Employee emp = employeeDAO.getEmployeeById(id);
            
            if (emp != null) {
                displayTableHeader();
                System.out.println(emp);
                displayTableFooter();
            } else {
                System.out.println("Employee not found with ID: " + id);
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid ID format.");
        }
    }

    private static void updateEmployee() {
        System.out.println("\n----- Update Employee -----");
        System.out.print("Enter employee ID to update: ");
        
        try {
            int id = Integer.parseInt(scanner.nextLine());
            Employee emp = employeeDAO.getEmployeeById(id);
            
            if (emp != null) {
                System.out.println("Current details:");
                displayTableHeader();
                System.out.println(emp);
                displayTableFooter();
                
                System.out.println("\nEnter new details (leave blank to keep current value):");
                
                System.out.print("Enter name [" + emp.getName() + "]: ");
                String name = scanner.nextLine();
                if (!name.trim().isEmpty()) {
                    emp.setName(name);
                }
                
                System.out.print("Enter email [" + emp.getEmail() + "]: ");
                String email = scanner.nextLine();
                if (!email.trim().isEmpty()) {
                    emp.setEmail(email);
                }
                
                System.out.print("Enter department [" + emp.getDepartment() + "]: ");
                String department = scanner.nextLine();
                if (!department.trim().isEmpty()) {
                    emp.setDepartment(department);
                }
                
                System.out.print("Enter salary [" + emp.getSalary() + "]: ");
                String salaryStr = scanner.nextLine();
                if (!salaryStr.trim().isEmpty()) {
                    try {
                        emp.setSalary(Double.parseDouble(salaryStr));
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid salary format. Keeping current value.");
                    }
                }
                
                if (employeeDAO.updateEmployee(emp)) {
                    System.out.println("Employee updated successfully!");
                } else {
                    System.out.println("Failed to update employee.");
                }
            } else {
                System.out.println("Employee not found with ID: " + id);
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid ID format.");
        }
    }

    private static void deleteEmployee() {
        System.out.println("\n----- Delete Employee -----");
        System.out.print("Enter employee ID to delete: ");
        
        try {
            int id = Integer.parseInt(scanner.nextLine());
            Employee emp = employeeDAO.getEmployeeById(id);
            
            if (emp != null) {
                System.out.println("Employee to delete:");
                displayTableHeader();
                System.out.println(emp);
                displayTableFooter();
                
                System.out.print("Are you sure you want to delete this employee? (y/n): ");
                String confirm = scanner.nextLine();
                
                if (confirm.equalsIgnoreCase("y")) {
                    if (employeeDAO.deleteEmployee(id)) {
                        System.out.println("Employee deleted successfully!");
                    } else {
                        System.out.println("Failed to delete employee.");
                    }
                } else {
                    System.out.println("Deletion cancelled.");
                }
            } else {
                System.out.println("Employee not found with ID: " + id);
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid ID format.");
        }
    }

    private static void displayTableHeader() {
        System.out.println("+-----+----------------------+---------------------------+-----------------+------------+");
        System.out.println("| ID  | Name                 | Email                     | Department      | Salary     |");
        System.out.println("+-----+----------------------+---------------------------+-----------------+------------+");
    }

    private static void displayTableFooter() {
        System.out.println("+-----+----------------------+---------------------------+-----------------+------------+");
    }
}
 