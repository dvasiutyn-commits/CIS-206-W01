
class Employee {
  constructor(name = "", idNumber = 0, department = "", position = "") {
    this.name = name;
    this.idNumber = idNumber;
    this.department = department;
    this.position = position;
  }

  setName(name) {
    this.name = name;
  }

  setIdNumber(idNumber) {
    this.idNumber = idNumber;
  }

  setDepartment(department) {
    this.department = department;
  }

  setPosition(position) {
    this.position = position;
  }

  getName() {
    return this.name;
  }

  getIdNumber() {
    return this.idNumber;
  }

  getDepartment() {
    return this.department;
  }

  getPosition() {
    return this.position;
  }
}

// First employee - all information
let emp1 = new Employee("Susan Meyers", 47899, "Accounting", "Vice President");

// Second employee - name and ID
let emp2 = new Employee("Mark Jones", 39119);
emp2.setDepartment("IT");
emp2.setPosition("Programmer");

// Third employee - default constructor
let emp3 = new Employee();
emp3.setName("Joy Rogers");
emp3.setIdNumber(81774);
emp3.setDepartment("Manufacturing");
emp3.setPosition("Engineer");

// Display employee information
console.log("Employee 1");
console.log(emp1.getName(), emp1.getIdNumber(), emp1.getDepartment(), emp1.getPosition());

console.log("Employee 2");
console.log(emp2.getName(), emp2.getIdNumber(), emp2.getDepartment(), emp2.getPosition());

console.log("Employee 3");
console.log(emp3.getName(), emp3.getIdNumber(), emp3.getDepartment(), emp3.getPosition());
