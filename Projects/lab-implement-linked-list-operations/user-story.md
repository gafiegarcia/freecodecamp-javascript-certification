# Implement Linked List Operations

In this lab, you will implement additional operations for a linked list data structure, building on the basic functionality of adding and removing nodes.

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should have a contains function that accepts a linked list and an element. It should return true if the specified element exists in the linked list, and false otherwise.
2. You should have a getAt function that accepts a linked list and an index. It should return the element at the given index in the linked list. If the index is out of bounds, it should return undefined.
3. You should have a insertAt function that accepts a linked list, an index, and an element. It should insert the given element at the specified position in the linked list. If the index is out of bounds, it should not modify the list.
4. You should have a removeAt function that accepts a linked list and an index. It should remove the node at the given index in the linked list. If the index is out of bounds, it should not modify the list.
5. You should have a clear function that accepts a linked list. It should remove all elements from the linked list, effectively resetting it to an empty state.

**Note**: Some later tests rely on earlier methods. For example, if getAt is not implemented correctly, tests for functions like insertAt and removeAt may fail even when those functions are close to correct.

**Tests**:

    Passed: 1. initList should return an object with head set to null and length set to 0.
    Passed: 2. add should increase the list length by one.
    Passed: 3. remove should decrease the list length by one.
    Passed: 4. You should have a contains function.
    Passed: 5. contains should return true if the element exists in the list.
    Passed: 6. contains should return false if the element does not exist in the list.
    Passed: 7. contains should return false for an empty list.
    Passed: 8. You should have a getAt function.
    Passed: 9. getAt should return the element at a given index.
    Passed: 10. getAt should return undefined for invalid indices.
    Passed: 11. getAt should return undefined for an empty list.
    Passed: 12. You should have an insertAt function.
    Passed: 13. insertAt should insert an element at the beginning of the list.
    Passed: 14. insertAt should insert an element at the middle of the list.
    Passed: 15. insertAt should insert an element at the end of the list.
    Passed: 16. insertAt should insert into an empty list at index 0.
    Passed: 17. insertAt should not modify the list for invalid indices.
    Passed: 18. You should have a removeAt function.
    Passed: 19. removeAt should remove the element at a specified index.
    Passed: 20. removeAt should remove the first element correctly.
    Passed: 21. removeAt should remove the last element correctly.
    Passed: 22. removeAt should reset the list when removing the only element.
    Passed: 23. removeAt should not modify the list for invalid indices.
    Passed: 24. You should have a clear function.
    Passed: 25. clear should remove all elements from the list.
    Passed: 26. clear should allow the list to be reused.
