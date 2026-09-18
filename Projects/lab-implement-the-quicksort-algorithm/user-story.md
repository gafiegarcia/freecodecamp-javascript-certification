# Implement the Quicksort Algorithm

In this lab you will implement the sorting algorithm: quicksort.

Quicksort is an efficient, recursive divide-and-conquer approach to sorting an array. In this method, a pivot value is chosen in the original array. The array is then partitioned into two subarrays of values less than and greater than the pivot value. Then the result of recursively calling the quicksort algorithm on both sub-arrays is combined. This continues until the base case of an empty or single-item array is reached, which is returned. The unwinding of the recursive calls gives back the sorted array.

While the choice of the pivot value is important, any pivot will do for our purposes here. For simplicity, the first or last element could be used.

Quicksort is a very efficient sorting method, providing O(nlog(n)) performance on average. It is also relatively easy to implement. These attributes make it a popular and useful sorting method.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories:**

1. You should have a `quicksort` function that takes an array of integers as input.
2. The `quicksort` function should return an array that contains the same integers as the input, but in order from lowest to highest.
3. The `quicksort` function should recursively call itself to sort the array.

**Tests:**

1. You should have a `quicksort` function.
2. `quicksort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92])` should return an array that is unchanged except for order.
3. `quicksort` should return a sorted array (least to greatest).
4. `quicksort` should not use the built-in `.sort()` method.
