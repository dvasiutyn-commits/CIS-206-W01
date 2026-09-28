// BMI Calculator
// Calculates BMI from weight and height.
// Denys Vasiutyn

const readline = require("readline");

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const POUNDS_TO_KG = 0.453592;
const INCHES_TO_METERS = 0.0254;

function convertWeight(weightPounds) {
    return weightPounds * POUNDS_TO_KG;
}

function convertHeight(totalInches) {
    return totalInches * INCHES_TO_METERS;
}

function calculateBMI(weightKg, heightMeters) {
    return weightKg / (heightMeters ** 2);
}

function printBMI(bmi) {
    console.log("Your BMI is:", bmi.toFixed(1));

    if (bmi < 18.5) {
        console.log("Underweight");
    } else if (bmi < 25) {
        console.log("Normal");
    } else {
        console.log("Overweight");
    }
}

// Displays the BMI table.
function displayBmiTable() {
    console.log("\nBMI Table");

    let header = "Weight";

    for (let height = 58; height <= 76; height += 2) {
        header += "\t" + height;
    }

    console.log(header);

    for (let weight = 100; weight <= 250; weight += 10) {
        let row = weight;

        for (let height = 58; height <= 76; height += 2) {
            const weightKg = convertWeight(weight);
            const heightMeters = convertHeight(height);
            const bmi = calculateBMI(weightKg, heightMeters);

            row += "\t" + bmi.toFixed(1);
        }

        console.log(row);
    }
}

function getWeight() {
    input.question("Enter your weight in pounds (or q to quit): ", function(answer) {

        if (answer.toLowerCase() === "q") {
            displayBmiTable();
            input.close();
            return;
        }

        const weightPounds = Number(answer);

        if (isNaN(weightPounds) || weightPounds <= 0) {
            console.log("Invalid weight. Please enter a valid number.");
            getWeight();
            return;
        }

        getHeight(weightPounds);
    });
}

function getHeight(weightPounds) {
    input.question("Enter your height in feet: ", function(heightFeet) {

        heightFeet = Number(heightFeet);

        if (isNaN(heightFeet) || heightFeet <= 0) {
            console.log("Invalid height. Please enter a valid number.");
            getHeight(weightPounds);
            return;
        }

        input.question("Enter the remaining inches: ", function(heightInches) {

            heightInches = Number(heightInches);

            if (isNaN(heightInches) || heightInches < 0) {
                console.log("Invalid inches. Please enter a valid number.");
                getHeight(weightPounds);
                return;
            }

            const weightKg = convertWeight(weightPounds);
            const totalInches = heightFeet * 12 + heightInches;
            const heightMeters = convertHeight(totalInches);
            const bmi = calculateBMI(weightKg, heightMeters);

            console.log("Weight:", weightPounds);
            console.log("Height:", heightFeet);
            console.log("Inches:", heightInches);

            printBMI(bmi);

            getWeight();
        });
    });
}

getWeight();