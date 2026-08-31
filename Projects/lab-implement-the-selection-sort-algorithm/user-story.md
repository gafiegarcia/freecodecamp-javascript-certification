# Implement the Selection Sort Algorithm

In this lab you will implement the selection sort algorithm. Selection sort works by selecting the minimum value in a list and swapping it with the first value in the list. It then starts at the second position, selects the smallest value in the remaining list, and swaps it with the second element. It continues iterating through the list and swapping elements until it reaches the end of the list. Now the list is sorted. Selection sort has quadratic time complexity in all cases.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should have a `selectionSort` function.
2. The `selectionSort` function should take an array, and return an array with the same elements but ordered from least to greatest.

**Tests**:

- Waiting:1. selectionSort should be a function.
- Waiting:2. selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]) should return an array that is unchanged except for order.
- Waiting:3. selectionSort should return a sorted array (least to greatest).
- Waiting:4. selectionSort should not use the built-in .sort() method.
