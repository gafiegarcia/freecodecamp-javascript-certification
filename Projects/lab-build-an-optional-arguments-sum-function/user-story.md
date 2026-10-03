# Build an Optional Arguments Sum Function

In this lab you will build a function that accepts up to two arguments, and sum them, but if there is only one argument returns a function that waits for the second number to sum.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. Create a function `addTogether`.
2. If the function receives two arguments, the function should return the sum of the two arguments.
3. If only one argument is provided, `addTogether` should return a function.
   - When the returned function is called with a single argument, it should return the sum.

   ```js
   const sumTwoAnd = addTogether(2);
   sumTwoAnd(3); // 5
   ```

4. If either argument isn't a valid number, return `undefined`.

**Tests**:

1. You should have the `addTogether` function.
2. `addTogether(2, 3)` should return `5`.
3. `addTogether(23.4, 30)` should return `53.4`.
4. `addTogether("2", 3)` should return `undefined`.
5. `addTogether(5, undefined)` should return `undefined`.
6. `addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ")` should return `undefined`.
7. `addTogether(5)` should return a function.
8. `addTogether(5)(7)` should return `12`.
9. `addTogether(2)([3])` should return `undefined`.
10. `addTogether(2, "3")` should return `undefined`.
