# Build a Range of Numbers Generator

In this lab, you will build a rangeOfNumbers function that generates an array of numbers within a specified range.

Examples:

    rangeOfNumbers(3, 9) returns [3, 4, 5, 6, 7, 8, 9]
    rangeOfNumbers(5, 5) returns [5]

Requirements:

    Use recursion (the function must call itself)
    No loops or array methods (for, while, Array.from, forEach, map, filter, reduce)

**Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.**

## User Stories:

    You should create a function named rangeOfNumbers that takes two parameters: startNum and endNum.
    The function should return an array of integers that begins with the number represented by the startNum parameter and ends with the number represented by the endNum parameter (inclusive).
    The startNum will always be less than or equal to the endNum.
    Your function must use recursion by calling itself. It should not use any loop syntax (for, while, Array.from(), or higher-order functions such as forEach, map, filter, or reduce).
    The function should handle the base case where startNum equals endNum by returning an array containing just that single number.
    For the recursive case, the function should call itself with modified parameters to build the array, then add the current number to the result.
    The function should not rely on global variables to cache or build the array.

## Tests:

    Passed: 1. You should have a function named rangeOfNumbers.
    Passed: 2. The rangeOfNumbers function should take two parameters.
    Passed: 3. Your function should return an array.
    Passed: 4. Your code should not use any loop syntax (for, while, Array.from() or higher order functions such as forEach, map, filter, or reduce).
    Passed: 5. rangeOfNumbers should use recursion (call itself) to solve this challenge.
    Passed: 6. rangeOfNumbers(1, 5) should return [1, 2, 3, 4, 5].
    Passed: 7. rangeOfNumbers(6, 9) should return [6, 7, 8, 9].
    Passed: 8. rangeOfNumbers(4, 4) should return [4].
    Passed: 9. rangeOfNumbers(10, 15) should return [10, 11, 12, 13, 14, 15].
    Passed: 10. rangeOfNumbers(2, 8) should return [2, 3, 4, 5, 6, 7, 8].
    Passed: 11. Global variables should not be used to cache the array.
