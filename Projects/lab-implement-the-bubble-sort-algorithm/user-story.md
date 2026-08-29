# Implement the Bubble Sort Algorithm

For this lab, you will implement the bubble sort algorithm. It starts at the beginning of an unsorted array and "bubbles up" unsorted values towards the end, iterating through the array until it is completely sorted. It does this by comparing adjacent items and swapping them if they are out of order. The method continues looping through the array until no swaps occur at which point the array is sorted.

This method requires multiple iterations through the array and for average and worst cases has quadratic time complexity. While simple, it is usually impractical in most situations.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

Write a function `bubbleSort` which takes an array of integers as input and returns an array of these integers in sorted order from least to greatest.

**Tests**:
- Passed:1. You should have a function named `bubbleSort`.
- Passed:2. `bubbleSort` should return a sorted array (least to greatest).
- Passed:3. `bubbleSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])` should return an array that is unchanged except for order.
- Passed:4. `bubbleSort` should not use the built-in `.sort()` method.
