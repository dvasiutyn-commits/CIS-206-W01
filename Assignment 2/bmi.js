// BMI Calculator
// This program calculates body mass index from weight and height.
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
}

input.question("Enter your weight in pounds: ", function(weightPounds) {
    weightPounds = Number(weightPounds);

    input.question("Enter your height in feet: ", function(heightFeet) {
        heightFeet = Number(heightFeet);

        input.question("Enter the remaining inches: ", function(heightInches) {
            heightInches = Number(heightInches);

            const weightKg = convertWeight(weightPounds);
            const totalInches = heightFeet * 12 + heightInches;
            const heightMeters = convertHeight(totalInches);
            const bmi = calculateBMI(weightKg, heightMeters);

            console.log("Weight:", weightPounds);
            console.log("Height:", heightFeet);
            console.log("Inches:", heightInches);
            printBMI(bmi);
            if (bmi < 18.5) {
             console.log("Underweight");
         } else if (bmi < 25) {
             console.log("Normal");
         } else {
             console.log("Overweight");
         }
         console.log("BMI ranges:");
     console.log("Underweight: below 18.5");
     console.log("Normal: 18.5 - 24.9");
     console.log("Overweight: 25 or higher");

            input.close();
        });
    });
});
