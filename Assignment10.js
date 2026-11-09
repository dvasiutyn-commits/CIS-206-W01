
 // Assignment 10 - Regular Expressions
 // JavaScript

 // Problem 1 - Check letters and numbers only
 console.log("Problem 1");

 let regex1 = /^[a-zA-Z0-9]+$/;
 console.log(regex1.test("ABCDEFabcdef123450"));
 console.log(regex1.test("*&%@#!}{"));


 // Problem 2 - 'a' followed by zero or more 'b'
 console.log("\nProblem 2");

 let regex2 = /^ab*$/;
 let tests2 = ["ab", "abc", "a", "ab", "abb"];

 for (let word of tests2) {
     console.log(word, regex2.test(word));
 }


 // Problem 3 - 'a' followed by one or more 'b'
 console.log("\nProblem 3");

 let regex3 = /^ab+$/;
 let tests3 = ["ab", "abc", "a", "ab", "abb"];

 for (let word of tests3) {
     console.log(word, regex3.test(word));
 }


 // Problem 4 - Lowercase words joined by underscore
 console.log("\nProblem 4");

 let regex4 = /^[a-z]+_[a-z]+$/;
 let tests4 = ["aab_cbbbc", "aab_Abbbc", "Aaab_abbbc"];

 for (let word of tests4) {
     console.log(word, regex4.test(word));
 }


 // Problem 5 - Word at beginning of string
 console.log("\nProblem 5");

 let regex5 = /^\w+/;
 let tests5 = [
     "The quick brown fox jumps over the lazy dog.",
     " The quick brown fox jumps over the lazy dog."
 ];

 for (let text of tests5) {
     console.log(regex5.test(text));
 }


 // Problem 6 - Find a word containing 'z'
 console.log("\nProblem 6");

 let regex6 = /\b\w*z\w*\b/g;
 let tests6 = [
     "The quick brown fox jumps over the lazy dog.",
     "Python Exercises."
 ];

 for (let text of tests6) {
     console.log(text.match(regex6) || []);
 }


 // Problem 7 - Remove leading zeros from IP address
 console.log("\nProblem 7");

 let ip = "216.08.094.196";
 let newIP = ip.replace(/\b0+(\d+)/g, "$1");

 console.log(newIP);


 // Problem 8 - Search for literal words
 console.log("\nProblem 8");

 let sentence8 = "The quick brown fox jumps over the lazy dog.";
 let words8 = ["fox", "dog", "horse"];

 for (let word of words8) {
     console.log(word, sentence8.includes(word));
 }


 // Problem 9 - Find word position
 console.log("\nProblem 9");

 let sentence9 = "The quick brown fox jumps over the lazy dog.";
 let word9 = "fox";

 console.log("Word:", word9);
 console.log("Position:", sentence9.search(/fox/));


 // Problem 10 - Replace spaces and underscores
 console.log("\nProblem 10");

 let text10a = "Regular Expressions";
 let text10b = "Code_Examples";

 console.log(text10a.replace(/ /g, "_"));
 console.log(text10b.replace(/_/g, " "));


 // Problem 11 - Extract date from URL
 console.log("\nProblem 11");

 let url = "https://www.washingtonpost.com/news/football-insider/wp/2016/09/02/odell-beckhams-fame-rests-on-one-stupid-little-ball-josh-norman-tells-author/";

 let date = url.match(/(\d{4})\/(\d{2})\/(\d{2})/);

 if (date) {
     console.log("Year:", date[1]);
     console.log("Month:", date[2]);
     console.log("Day:", date[3]);
 }


 // Problem 12 - Words starting with 'a' or 'e'
 console.log("\nProblem 12");

 let sentence12 = "The following example creates an ArrayList with a capacity of 50 elements. Four elements are then added to the ArrayList and the ArrayList is trimmed accordingly.";

 let regex12 = /\b[ae]\w*/gi;

 console.log(sentence12.match(regex12));


 // Problem 13 - Replace spaces, commas and dots with colon
 console.log("\nProblem 13");

 let sentence13 = "Python Exercises, PHP exercises.";

 console.log(sentence13.replace(/[ ,\.]/g, ":"));


 // Problem 14 - Words starting with 'a' or 'e'
 console.log("\nProblem 14");

 let sentence14 = "The following example creates an ArrayList with a capacity of 50 elements. Four elements are then added to the ArrayList and the ArrayList is trimmed accordingly.";

 let regex14 = /\b[ae]\w*/gi;

 console.log(sentence14.match(regex14));


 // Problem 15 - Remove multiple spaces
 console.log("\nProblem 15");

 let sentence15 = "Python    Exercises";

 console.log(sentence15.replace(/\s+/g, " "));
