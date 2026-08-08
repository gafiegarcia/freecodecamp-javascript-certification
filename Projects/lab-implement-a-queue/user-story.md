# Implement a Queue

In this lab, you will implement a queue data structure using functions. A queue is a First-In-First-Out (FIFO) data structure where elements are added to the back of the queue and removed from the front.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should have an `enqueue` function that adds an element to the back of the queue.
2. You should have a `dequeue` function that removes and returns the front element of the queue.
3. You should have a `front` function that returns the front element of the queue without removing it.
4. You should have a `size` function that returns the number of elements in the queue.
5. You should have an `isEmpty` function that returns `true` if the queue is empty and `false` otherwise.

**Note**: Most tests depend on the `enqueue` function. Implement that one first, as tests for `dequeue`, `front`, `size`, and `isEmpty` require adding elements to the queue.

**Tests**:

    Passed: 1. You should have an enqueue function.
    Passed: 2. enqueue function should add an element to the back of the queue.
    Passed: 3. You should have a dequeue function.
    Passed: 4. dequeue function should remove and return the front element of the queue.
    Passed: 5. dequeue should return undefined when called on an empty queue.
    Passed: 6. enqueue should continue to add elements to the back of the queue after dequeues.
    Passed: 7. Different queue instances should not share state.
    Passed: 8. You should have a front function.
    Passed: 9. front function should return the front element of the queue without removing it.
    Passed: 10. front should return undefined when called on an empty queue.
    Passed: 11. You should have a size function.
    Passed: 12. size function should return the correct number of elements in the queue.
    Passed: 13. You should have an isEmpty function.
    Passed: 14. isEmpty function should return true for an empty queue.
    Passed: 15. isEmpty function should return false for a non-empty queue.
    Passed: 16. isEmpty function should return true after all elements are removed from the queue.
