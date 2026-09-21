console.log("Student Grade Validator");
let studentName = "Denys";
let age = 19;
let grade = 85;

console.log("Student:", studentName);
console.log("Age:", age);
console.log("Grade:", grade);
console.log("\nValidation Results:");

// #1 Data Type Validation
if (typeof studentName === "string" && typeof age === "number" && typeof grade === "number") {
    console.log("Data types are valid.");
} else {
    console.log("Invalid data type.");
}
 // #1 Range and Constraint Validation

if (age >= 18 && age <= 100 && grade >= 0 && grade <= 100) {
    console.log("Values are within the valid range.");
} else {
    console.log("Invalid range.");
}

// #2 Exception Handling
try {
    if (grade < 0 || grade > 100) {
        throw new Error("Grade must be between 0 and 100.");
    }

    console.log("Grade accepted.");
} catch (error) {
    console.log("Error:", error.message);
}

// #3 Nested if statement
if (grade >= 60) {
    console.log("Student passed.");

    if (grade >= 90) {
        console.log("Excellent grade.");
    } else {
        console.log("Passing grade.");
    }
} else {
    console.log("Student did not pass.");
}