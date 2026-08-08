# Implement a Stack

In this lab, you will implement a stack data structure using functions. A stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the top.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should have an `initStack` function that returns an object with a `collection` property set to an empty array.
2. You should have a `push` function that adds an element to the top of the stack.
3. You should have a `pop` function that removes and returns the top element of the stack, or `undefined` if there isn't one.
4. You should have a `peek` function that returns the top element of the stack without removing it, or `undefined` if there isn't one.
5. You should have an `isEmpty` function that returns `true` if the stack contains no elements, and `false` otherwise.
6. You should have a `clear` function that removes all elements from the stack.

**Note**: Most tests depend on the `initStack` and `push` functions. Implement them first, as tests for `pop`, `peek`, `isEmpty`, and `clear` require adding elements to the stack.

**Tests**:

    Passed: 1. You should have a `push` function.
    Passed: 2. push function should add an element to the top of the stack.
    Passed: 3. You should have a pop function.
    Passed: 4. pop function should remove and return the top element of the stack.
    Passed: 5. pop function should return undefined if the stack is empty.
    Passed: 6. pop function should return falsy values correctly.
    Passed: 7. You should have a peek function.
    Passed: 8. peek function should return the top element of the stack without removing it.
    Passed: 9. peek function should return undefined if the stack is empty.
    Passed: 10. peek function should return falsy values correctly.
    Passed: 11. You should have an isEmpty function.
    Passed: 12. isEmpty function should return true for an empty stack.
    Passed: 13. isEmpty function should return false for a non-empty stack.
    Passed: 14. isEmpty function should return false when the top element is falsy.
    Passed: 15. You should have a clear function.
    Passed: 16. clear function should remove all elements from the stack.
