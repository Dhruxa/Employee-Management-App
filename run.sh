#!/bin/bash
mvn  compile
mvn exec:java -Dexec.mainClass="com.ems.main.EmployeeManagementSystem"
 