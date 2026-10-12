// Activity 2 - RLE Encoding and Decoding

// Encode a string
function encodeRLE(text) {
    if (typeof text !== "string" || text.length === 0) {
        return "Invalid input";
    }

    let result = "";
    let count = 1;

    for (let i = 0; i < text.length; i++) {
        if (text[i] < "A" || (text[i] > "Z" && text[i] < "a") || text[i] > "z") {
            return "Invalid input";
        }

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

// Decode an RLE string
function decodeRLE(text) {
    if (typeof text !== "string" || text.length === 0) {
        return "Invalid input";
    }

    let result = "";
    let i = 0;

    while (i < text.length) {
        let letter = text[i];

        if (!((letter >= "A" && letter <= "Z") ||
              (letter >= "a" && letter <= "z"))) {
            return "Invalid input";
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

            if (count < 2 || !Number.isSafeInteger(count) || count > 100000) {
                return "Invalid input";
            }
        }

        result += letter.repeat(count);
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
    let hasNumber = false;

    for (let i = 0; i < input.length; i++) {
        if (input[i] >= "0" && input[i] <= "9") {
            hasNumber = true;
        }
    }

    if (hasNumber) {
        console.log("Decoded:", decodeRLE(input));
    } else {
        console.log("Encoded:", encodeRLE(input));
    }

    rl.close();
});