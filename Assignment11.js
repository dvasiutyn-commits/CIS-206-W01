
const sqlite3 = require("sqlite3").verbose();
const prompt = require("prompt-sync")();

// Assignment 11 - Northwind Database
// This program lets users view and edit database records.

const db = new sqlite3.Database("./Northwind.db");

// Show all tables in the database
function showTables() {
    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", [], (err, tables) => {
        if (err) {
            console.log(err.message);
            db.close();
            return;
        }

        const names = tables.map(table => table.name);

        console.log("\n=== NORTHWIND TABLES ===");

        names.forEach((name, index) => {
            console.log((index + 1) + ". " + name);
        });

        const choice = Number(prompt("Select table number (0 to exit): "));

        if (choice === 0) {
            db.close();
        } else if (choice >= 1 && choice <= names.length && Number.isInteger(choice)) {
            showRecords(names[choice - 1]);
        } else {
            console.log("Invalid choice.");
            showTables();
        }
    });
}

// Show all records from the selected table
function showRecords(table) {
    db.all(`SELECT * FROM "${table}"`, [], (err, rows) => {
        if (err) {
            console.log(err.message);
            showTables();
            return;
        }

        console.log("\n=== " + table + " ===");

        if (rows.length === 0) {
            console.log("No records found.");
        } else {
            console.table(rows.map((row, index) => ({
                Row: index + 1,
                ...row
            })));
        }

        // Only these three tables can be edited
        if (["Customers", "Employees", "Products"].includes(table)) {
            editMenu(table);
        } else {
            showTables();
        }
    });
}

// Show the editing menu
function editMenu(table) {
    console.log("\nI - Insert");
    console.log("U - Update");
    console.log("D - Delete");
    console.log("B - Back");

    const choice = prompt("Choose an option: ").toUpperCase();

    if (choice === "I") {
        insertRecord(table);
    } else if (choice === "U") {
        updateRecord(table);
    } else if (choice === "D") {
        deleteRecord(table);
    } else if (choice === "B") {
        showTables();
    } else {
        console.log("Invalid choice.");
        editMenu(table);
    }
}

// Get column information from the selected table
function getColumns(table, next) {
    db.all(`PRAGMA table_info("${table}")`, [], (err, columns) => {
        if (err) {
            console.log(err.message);
            editMenu(table);
            return;
        }

        next(columns);
    });
}

// Insert a new record
function insertRecord(table) {
    getColumns(table, (columns) => {
        const fields = [];
        const values = [];

        console.log("\n=== INSERT RECORD ===");
        console.log("Leave optional fields empty.");

        for (const column of columns) {
            // Skip automatic ID fields
            if (column.pk && column.type.toUpperCase() === "INTEGER") {
                continue;
            }

            const value = prompt(column.name + ": ").trim();

            if (value === "" && column.notnull) {
                console.log("This field is required.");
                editMenu(table);
                return;
            }

            if (value !== "") {
                fields.push('"' + column.name + '"');
                values.push(value);
            }
        }

        if (fields.length === 0) {
            console.log("No data entered.");
            editMenu(table);
            return;
        }

        const marks = fields.map(() => "?").join(", ");

        const sql = `INSERT INTO "${table}" (${fields.join(", ")})
                     VALUES (${marks})`;

        db.run(sql, values, function(err) {
            if (err) {
                console.log("Error:", err.message);
            } else {
                console.log("Record added successfully!");
            }

            editMenu(table);
        });
    });
}

// Update one field in a selected record
function updateRecord(table) {
    db.all(`SELECT * FROM "${table}"`, [], (err, rows) => {
        if (err || rows.length === 0) {
            console.log("No records available.");
            editMenu(table);
            return;
        }

        console.table(rows.map((row, index) => ({
            Row: index + 1,
            ...row
        })));

        const number = Number(prompt("Row number to update: "));

        if (!Number.isInteger(number) || number < 1 || number > rows.length) {
            console.log("Invalid row.");
            editMenu(table);
            return;
        }

        getColumns(table, (columns) => {
            const key = columns.find(column => column.pk);

            if (!key) {
                console.log("Primary key not found.");
                editMenu(table);
                return;
            }

            const fields = columns.filter(column => !column.pk);

            fields.forEach((field, index) => {
                console.log((index + 1) + ". " + field.name);
            });

            const choice = Number(prompt("Field number: "));

            if (!Number.isInteger(choice) || choice < 1 || choice > fields.length) {
                console.log("Invalid field.");
                editMenu(table);
                return;
            }

            const field = fields[choice - 1];
            const value = prompt("New value: ").trim();

            if (value === "" && field.notnull) {
                console.log("This field cannot be empty.");
                editMenu(table);
                return;
            }

            const id = rows[number - 1][key.name];

            const sql = `UPDATE "${table}"
                         SET "${field.name}" = ?
                         WHERE "${key.name}" = ?`;

            db.run(sql, [value === "" ? null : value, id], function(err) {
                if (err) {
                    console.log("Error:", err.message);
                } else {
                    console.log("Record updated!");
                }

                editMenu(table);
            });
        });
    });
}

// Delete a selected record
function deleteRecord(table) {
    db.all(`SELECT * FROM "${table}"`, [], (err, rows) => {
        if (err || rows.length === 0) {
            console.log("No records available.");
            editMenu(table);
            return;
        }

        console.table(rows.map((row, index) => ({
            Row: index + 1,
            ...row
        })));

        const number = Number(prompt("Row number to delete: "));

        if (!Number.isInteger(number) || number < 1 || number > rows.length) {
            console.log("Invalid row.");
            editMenu(table);
            return;
        }

        const answer = prompt("Are you sure? (Y/N): ").toUpperCase();

        if (answer !== "Y") {
            console.log("Canceled.");
            editMenu(table);
            return;
        }

        getColumns(table, (columns) => {
            const key = columns.find(column => column.pk);

            if (!key) {
                console.log("Primary key not found.");
                editMenu(table);
                return;
            }

            const id = rows[number - 1][key.name];

            const sql = `DELETE FROM "${table}"
                         WHERE "${key.name}" = ?`;

            db.run(sql, [id], function(err) {
                if (err) {
                    console.log("Error:", err.message);
                } else {
                    console.log("Record deleted!");
                }

                editMenu(table);
            });
        });
    });
}

// Start the program
showTables();
