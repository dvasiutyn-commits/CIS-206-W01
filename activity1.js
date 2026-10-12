/**
 * Activity 1 - Run-Length Encoding
 * Compresses a string of alphabetic characters.
 */

// Function to encode a string
function encodeRLE(text) {
    if (typeof text !== "string" || !/^[a-zA-Z]+$/.test(text)) {
        return "Invalid input";
    }

    let result = "";
    let count = 1;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === text[i + 1]) {
            count++;
        } else {
            result += text[i];

            if (count > 1) {
                result += count;
            }

            count = 1;
        }
    }

    return result;
}

// Ask the user for input
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a string of letters: ", function(input) {
    console.log("Encoded:", encodeRLE(input));
    rl.close();
});