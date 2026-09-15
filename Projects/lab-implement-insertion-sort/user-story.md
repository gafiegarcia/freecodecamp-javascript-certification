# Implement Insertion Sort

In this lab, you will implement the insertion sort algorithm. This method works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backwards into the sorted array until it is in sorted position. It continues iterating through the list and swapping new items backwards into the sorted portion until it reaches the end. This algorithm has quadratic time complexity in the average and worst cases.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should create an `insertionSort` function.
2. The `insertionSort` function should take an array of integers and return an array with the same integers sorted from least to greatest.

**Tests:**

1. `insertionSort` should be a function.
2. `insertionSort`([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]) should return an array that is unchanged except for order.
3. `insertionSort` should return a sorted array (least to greatest).
4. `insertionSort`([5, 4, 33, 2, 8]) should return [2, 4, 5, 8, 33].
5. `insertionSort` should not use the built-in `.sort()` method.
