#  Employee Management System

A console-based Employee Management System built with Java, JDBC, and MySQL.

## Features

- Add new employees
- View all employees in a tabular format
- Search for employees by ID
- Update employee information
- Delete employees

## Setup

1. Ensure MySQL is installed and running
2. Update the database credentials in `src/main/java/com/ems/util/DBConnection.java` if needed
3. Compile and run the application:

```bash
mvn compile
mvn exec:java -Dexec.mainClass="com.ems.main.EmployeeManagementSystem"
```

## Database Structure

The system automatically creates a database named `ems` with an `employees` table.

```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL,
  salary DOUBLE NOT NULL
);
```
 