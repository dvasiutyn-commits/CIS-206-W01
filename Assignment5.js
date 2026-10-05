// BMI Calculator
// This program calculates body mass index from weight and height.
// Denys Vasiutyn

const POUNDS_TO_KG = 0.453592;
const INCHES_TO_METERS = 0.0254;

function convertWeight(weightPounds) {
    if (weightPounds <= 0) {
        return "Invalid weight";
    }

    return weightPounds * POUNDS_TO_KG;
}

function convertHeight(totalInches) {
    if (totalInches <= 0) {
        return "Invalid height";
    }

    return totalInches * INCHES_TO_METERS;
}

function calculateBMI(weightKg, heightMeters) {
    if (weightKg <= 0 || heightMeters <= 0) {
        return "Invalid input";
    }

    return weightKg / (heightMeters ** 2);
}

module.exports = {
    convertWeight,
    convertHeight,
    calculateBMI
};