# The Last Challenge: Bucket Fill 3

Today marks a year of daily coding challenges. This is the last new one for now. Good luck!

Given a 2D grid of single-letter color strings and a target color, return the minimum number of flood fill "clicks" needed to make the entire grid that color.

- Each click changes the clicked cell's color and the entire region of connected cells of the same color (4-directional).
- Clicks can use any color as an intermediate step, not just the target color.

### Tests:

1. `bucketFill([["B", "B"], ["B", "B"]], "R")` should return `1`.
2. `bucketFill([["G", "G", "G"], ["G", "G", "G"], ["G", "G", "G"]], "G")` should return `0`.
3. `bucketFill([["P", "P", "Y"], ["Y", "P", "Y"], ["Y", "P", "P"]], "O")` should return `2`.
4. `bucketFill([["G", "Y", "C", "C"], ["Y", "Y", "Y", "B"], ["C", "Y", "B", "B"], ["C", "B", "B", "C"]], "R")` should return `4`.
5. `bucketFill([["G", "G", "O", "O"], ["G", "Y", "B", "Y"], ["B", "Y", "B", "Y"], ["B", "Y", "B", "Y"], ["G", "G", "G", "G"]], "P")` should return `5`.
6. `bucketFill([["R", "G", "R", "G"], ["R", "G", "R", "G"], ["B", "B", "B", "B"], ["B", "B", "B", "B"], ["R", "G", "R", "G"]], "Y")` should return `3`.
