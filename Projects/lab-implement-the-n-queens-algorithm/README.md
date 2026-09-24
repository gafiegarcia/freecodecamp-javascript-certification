"cheated" a bit since I kept failing to imagine how the stack should be treated, and whether popping the first one initialized would be safe to do. Claude gave the **key**: each stack item is a **partial board**, unlike DFS lab "Visited" list (list containing single nodes).This is actually similar to the [parentheses generator in the BFS workshop](https://www.freecodecamp.org/learn/javascript-v9/workshop-breadth-first-search-js/step-14), "queueing" (or rather, *stacking*) the explored "safe partial boards".

1. [lab-implement-the-n-queens-algorithm.js](./lab-implement-the-n-queens-algorithm.js): submitted (ngl still feels like cheating...)
2. [lab-implement-the-n-queens-algorithm-reattempt1.js](./lab-implement-the-n-queens-algorithm-reattempt1.js): post-review reattempt, after realizing that **the "anchor" row was unnecessary**. Outer loop gets deleted
3. [lab-implement-the-n-queens-algorithm-reattempt2.js](./lab-implement-the-n-queens-algorithm-reattempt2.js): stylistic clean up
