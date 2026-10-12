// Activity 3 - RLE with Escape Sequences

// Encode a string
function encodeRLE(text) {
    if (typeof text !== "string" || text.length === 0) {
        return "Invalid input";
    }

    let result = "##00";
    let count = 1;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === text[i + 1]) {
            count++;
        } else {
            let character = text[i];

            if (character === "#") {
                result += "##";
            } else if (character >= "0" && character <= "9") {
                result += "#" + character;
            } else {
                result += character;
            }

            if (count > 1) {
                result += count;
            }

            count = 1;
        }
    }

    return result;
}

// Decode a string
function decodeRLE(text) {
    if (typeof text !== "string" || !text.startsWith("##00")) {
        return "Invalid input";
    }

    let result = "";
    let i = 4;

    while (i < text.length) {
        let character = text[i];

        if (character === "#") {
            i++;

            if (i >= text.length) {
                return "Invalid input";
            }

            character = text[i];

            if (character !== "#" && !(character >= "0" && character <= "9")) {
                return "Invalid input";
            }
        }

        i++;

        let number = "";

        while (i < text.length && text[i] >= "0" && text[i] <= "9") {
            number += text[i];
            i++;
        }

        let count = 1;

        if (number !== "") {
            count = Number(number);

            if (!Number.isSafeInteger(count) || count < 2 || count > 100000) {
                return "Invalid input";
            }
        }

        result += character.repeat(count);
    }

    return result;
}

// Ask user for input
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a string: ", function(input) {
    if (input.startsWith("##00")) {
        console.log("Decoded:", decodeRLE(input));
    } else {
        console.log("Encoded:", encodeRLE(input));
    }

    rl.close();
});