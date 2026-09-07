# Restore a Coherent Narrative from an Array of Story Fragments

In this lab, you will restore a coherent narrative from a corrupted array of story fragments.

You will practice using loops by implementing fundamental array algorithms from scratch.

You will work with arrays of story fragment objects. Each fragment object has the following properties:

| Property | Description | Example value |
| --- | --- | --- |
| `id` | A positive integer indicating the fragment's position in the story | `3` |
| `text` | The actual story content | `"and I use Arch btw.\""` |

In this lab, you are provided with a prefilled array called `shuffledFragments`.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**

1. You should not change the pre-filled `shuffledFragments` array.
2. You should create a function named `compactFragments` that takes an array of fragments and returns a new array with all undefined elements removed. If the function removes any undefined elements, it should log a message to the console. The message should start with the prefix `[COMPACTED]`.
3. You should declare a variable named `compactedShuffledFragments` and assign it the result of calling `compactFragments` with the `shuffledFragments` array.
4. You should create a function named `sortFragments` that takes an array of fragments without `undefined` elements and returns a new array sorted by the `id` property in ascending order, keeping fragments that share the same `id` in their original order. You should not use JavaScript's built-in `sort` method.
5. You should declare a variable named `sortedFragments` and assign it the result of calling `sortFragments` with the `compactedShuffledFragments` array.
6. You should create a function named `dedupeFragments` that takes a sorted array of fragments and returns a new array with duplicates removed, keeping only the first occurrence. You should define duplicates as two or more fragments sharing the same `id`. For each `id` that is deduplicated, the function should log a message to the console. The message should start with the prefix `[DEDUPED]`.
7. You should declare a variable named `dedupedFragments` and assign it the result of calling `dedupeFragments` with the `sortedFragments` array.
8. You should create a function named `fillMissingFragments` that takes a sorted array of fragments and returns a new array with missing fragments filled with placeholder objects. You should define missing fragments as gaps in the sequence between the lowest and highest `id`. The placeholder objects should have the format `{ id: missingId, text: "[...]" }`. For each placeholder added, the function should log a message to the console. The message should start with the prefix `[FILLED]`.
9. You should declare a variable named `filledFragments` and assign it the result of calling `fillMissingFragments` with the `dedupedFragments` array.
10. You should create a function named `assembleStory` that takes a sorted array of fragments and returns a single string containing all fragment texts, separated by newlines.
11. You should use `assembleStory` with your `filledFragments` to display the complete story in the console.
12. Your functions `compactFragments`, `sortFragments`, `dedupeFragments`, `fillMissingFragments` and `assembleStory` should not mutate the array that they are called with.

**Example**

Here is an example of an array containing story fragments:

```js
const exampleArray = [
  { id: 3, text: "and I use Arch btw.\"" },
  ,
  { id: 1, text: "Naomi said:" },
  { id: 3, text: "and I use Arch btw.\"" },
];
```

After restoring the story from `exampleArray`, it would look like this:

```
Naomi said:
[...]
and I use Arch btw."
```

**Tests**:
1. You should not change the pre-filled `shuffledFragments` array.
2. You should have a `compactFragments` function.
3. `compactFragments([{ id: 1, text: "Hello" }, undefined])` should log a message that starts with `[COMPACTED]`.
4. When the `compactFragments` function is called with an array containing `undefined` elements, it should log a console message that starts with `[COMPACTED]`.
5. `compactFragments([{ id: 1, text: "Hello" },,])` should log a message that starts with `[COMPACTED]`.
6. When the `compactFragments` function is called with an array containing empty slots, it should log a console message that starts with `[COMPACTED]`.
7. When the `compactFragments` function is called with the array `[{ id: 1, text: "Hello" }, { id: 2, text: "World" }]`, it should not log any console messages that start with `[COMPACTED]`.
8. `compactFragments([{ id: 1, text: "Hello" }, undefined, { id: 2, text: "World" }])` should return `[{ id: 1, text: "Hello" }, { id: 2, text: "World" }]`.
9. `compactFragments` should not mutate the array passed in.
10. `compactedShuffledFragments` should be an array with no `undefined` elements.
11. You should have a `sortFragments` function.
12. `sortFragments([{ id: 30, text: "c" }, { id: 10, text: "a" }, { id: 10, text: "dup" }, { id: 20, text: "b" }])` should return `[{ id: 10, text: "a" }, { id: 10, text: "dup" }, { id: 20, text: "b" }, { id: 30, text: "c" }]`.
13. `sortFragments` should not use the built-in `.sort()` method.
14. `sortFragments` should not mutate the array passed in.
15. `sortedFragments` should have each element's `id` less than or equal to the next element's `id`.
16. You should have a `dedupeFragments` function.
17. `dedupeFragments([{ id: 1, text: "first" }, { id: 1, text: "dup" }, { id: 2, text: "second" }])` should return `[{ id: 1, text: "first" }, { id: 2, text: "second" }]`.
18. `dedupeFragments([{ id: 1, text: "a" }, { id: 1, text: "dup" }, { id: 2, text: "b" }, { id: 2, text: "dup" }, { id: 3, text: "c" }])` should log a `[DEDUPED]` message for each duplicated id.
19. `dedupeFragments([{ id: 1, text: "a" }, { id: 2, text: "b" }, { id: 2, text: "dup" }])` should log a `[DEDUPED]` message when the last id is duplicated.
20. When `dedupeFragments` is called with an array containing duplicates, it should log a message starting with `[DEDUPED]` for each duplicated id.
21. `dedupeFragments` should not mutate the array passed in.
22. `dedupedFragments` should have no duplicate `id` values.
23. You should have a `fillMissingFragments` function.
24. `fillMissingFragments([{ id: 1, text: "a" }, { id: 3, text: "c" }])` should return `[{ id: 1, text: "a" }, { id: 2, text: "[...]" }, { id: 3, text: "c" }]`.
25. `fillMissingFragments([{ id: 1, text: "a" }, { id: 3, text: "c" }])` should log a message that starts with `[FILLED]`.
26. When `fillMissingFragments` adds a placeholder, it should log a message starting with `[FILLED]`.
27. `fillMissingFragments` should not mutate the array passed in.
28. `filledFragments` should have no gaps in the id sequence.
29. You should have an `assembleStory` function.
30. `assembleStory([{ id: 1, text: "Hello" }, { id: 2, text: "World" }])` should return the string `"Hello\nWorld"`.
31. `assembleStory` should not mutate the array passed in.
32. You should call `console.log` with the result of `assembleStory(filledFragments)`.
