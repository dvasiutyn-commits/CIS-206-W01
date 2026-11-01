
const fs = require("fs");
const readline = require("readline");

// Activity 1: Read customer data into an array of objects
function loadCustomers(filename) {
    const text = fs.readFileSync(filename, "utf8");
    const lines = text.trim().split(/\r?\n/);
    const customers = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].match(/("(?:[^"]|"")*"|[^,]*)(,|$)/g);
        if (!values) continue;

        const fields = values.map(value =>
            value.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')
        );

        if (fields.length >= 10) {
            customers.push({
                company: fields[1],
                contact: fields[2],
                phone: fields[9]
            });
        }
    }

    return customers;
}

// Display customer information
function displayCustomers(customers) {
    if (customers.length === 0) {
        console.log("No customers found.");
        return;
    }

    for (const customer of customers) {
        console.log("Company:", customer.company);
        console.log("Contact:", customer.contact);
        console.log("Phone:", customer.phone);
        console.log("----------------------");
    }
}

// Activity 2: Sort by company name
function sortByCompany(customers) {
    const sorted = [...customers].sort((a, b) =>
        a.company.localeCompare(b.company)
    );
    displayCustomers(sorted);
}

// Sort by contact name
function sortByContact(customers) {
    const sorted = [...customers].sort((a, b) =>
        a.contact.localeCompare(b.contact)
    );
    displayCustomers(sorted);
}

// Search by company name
function searchByCompany(customers, name) {
    const results = customers.filter(customer =>
        customer.company.toLowerCase().includes(name.toLowerCase())
    );
    displayCustomers(results);
}

// Search by contact name
function searchByContact(customers, name) {
    const results = customers.filter(customer =>
        customer.contact.toLowerCase().includes(name.toLowerCase())
    );
    displayCustomers(results);
}

// Activity 3: Menu with input validation
function main() {
    let customers;

    try {
        customers = loadCustomers("customers.csv");
    } catch (error) {
        console.log("Error reading customers.csv");
        return;
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function menu() {
        console.log("\nNorthwind Customers Menu");
        console.log("1. Display customers sorted by company name");
        console.log("2. Display customers sorted by contact name");
        console.log("3. Search customers by company name");
        console.log("4. Search customers by contact name");
        console.log("5. Exit");

        rl.question("Enter your choice (1-5): ", choice => {
            if (choice === "1") {
                sortByCompany(customers);
                menu();
            } else if (choice === "2") {
                sortByContact(customers);
                menu();
            } else if (choice === "3" || choice === "4") {
                rl.question("Enter a name: ", name => {
                    if (name.trim() === "") {
                        console.log("Please enter a name.");
                    } else if (choice === "3") {
                        searchByCompany(customers, name.trim());
                    } else {
                        searchByContact(customers, name.trim());
                    }
                    menu();
                });
            } else if (choice === "5") {
                console.log("Goodbye!");
                rl.close();
            } else {
                console.log("Invalid choice. Please enter 1-5.");
                menu();
            }
        });
    }

    menu();
}

main();
