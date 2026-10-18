
const fs = require("fs");
const readline = require("readline");

const names = fs.readFileSync("names.txt", "utf8").split("\n");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function searchName() {
    rl.question("Enter a name (or quit to stop): ", function(name) {
        if (name.toLowerCase() === "quit") {
            rl.close();
            return;
        }

        if (names.some(n => n.trim().toLowerCase() === name.trim().toLowerCase())) {
            console.log(name + " was found.");
        } else {
            fs.appendFileSync("nofound.txt", name + "\n");
            console.log(name + " was not found.");
        }

        searchName();
    });
}

searchName();
