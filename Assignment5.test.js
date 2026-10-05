const {
    convertWeight,
    convertHeight,
    calculateBMI
} = require("./Assignment5");

test("converts pounds to kilograms", () => {
    expect(convertWeight(150)).toBeCloseTo(68.04, 1);
});

test("converts inches to meters", () => {
    expect(convertHeight(70)).toBeCloseTo(1.78, 1);
});

test("calculates BMI correctly", () => {
    expect(calculateBMI(68, 1.75)).toBeCloseTo(22.2, 1);
});

test("does not allow negative weight", () => {
    expect(convertWeight(-100)).toBe("Invalid weight");
});

test("does not allow zero height", () => {
    expect(convertHeight(0)).toBe("Invalid height");
});