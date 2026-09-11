# Build a Device Loan Ledger

You are a software developer tasked with creating a ledger application to manage IT hardware devices provisioned by your company's Service Desk. The ledger is an object whose keys are asset tags and whose values are objects:

```js
const ledger = {
  "1": {
    type: "Laptop",
    status: "CheckedIn",
    borrower: {
      name: "",
      email: ""
    },
    dueDate: ""
  }
};
```

**Objective**: Fulfill the user stories below and get all the tests to pass to complete the lab.

**User Stories**:

1. You should model the ledger as an object where each device is keyed by its asset tag and has `type`, `status`, `borrower` (with `name` and `email`), and `dueDate` properties.
2. You should implement a `checkoutDevice(ledger, assetTag, borrower)` function that takes a ledger object and clones it without mutating the original. On the clone, it should set the borrower object's `name` and `email`, update the status to `"CheckedOut"`, and return an object of the form `{ ledger: updatedLedger, message: confirmationString }`, where the message includes the asset tag and the borrower object's name.
   - If `assetTag` does not exist in the ledger, the function should return the ledger unchanged along with a message that includes the asset tag and explains that it was not found.
   - If the device is already `"CheckedOut"`, the function should return the ledger unchanged and leave the current borrower in place, along with a message that includes the asset tag and explains that the device is already checked out.
3. You should implement a `checkinDevice(ledger, assetTag)` function that takes a ledger object and clones it without mutating the original. On the clone, it should clear the borrower object's `name` and `email`, reset `dueDate` to `""`, update the status to `"CheckedIn"`, and return an object of the form `{ ledger: updatedLedger, message: confirmationString }`, where the message includes the asset tag.
   - If `assetTag` does not exist in the ledger, the function should return the ledger unchanged along with a message that includes the asset tag and explains that it was not found.
4. You should implement a `listOverdueDevices(ledger, today)` function that takes a ledger object and returns an array of the device objects that are overdue, sorted by `dueDate` in ascending order. A device is overdue when its status is `"CheckedOut"` and its `dueDate` is strictly before `today`. Both `today` and `dueDate` are strings in month/day/year order, and the month and day may or may not be zero-padded (for example, `"9/5/2025"` and `"09/05/2025"` are both valid).
   - You should not use the JavaScript `Date` object anywhere in your code.
5. You should implement a `serializeLedger(ledger)` function that converts the ledger object into a JSON string, and a `loadLedger(json)` function that converts a JSON string back into a JavaScript object.

**Tests:**

1. You should create a function named `checkoutDevice`.
2. You should create a function named `checkinDevice`.
3. You should create a function named `listOverdueDevices`.
4. You should create a function named `serializeLedger`.
5. You should create a function named `loadLedger`.
6. Your `checkoutDevice` function should not mutate the original ledger.
7. Your `checkoutDevice` function should set the borrower's name and email, and set status to `"CheckedOut"`.
8. Your `checkoutDevice` function should return a confirmation message that includes the asset tag and the borrower's name.
9. Your `checkoutDevice` function should preserve unrelated devices and unchanged fields in the returned ledger.
10. Your `checkoutDevice` function should return the ledger unchanged and a message that includes the asset tag when the asset tag is not found.
11. Your `checkoutDevice` function should return the ledger unchanged, leave the current borrower in place, and return a message that includes the asset tag when the device is already checked out.
12. Your `checkinDevice` function should not mutate the original ledger.
13. Your `checkinDevice` function should clear the borrower's name and email, reset `dueDate` to `""`, and set status to `"CheckedIn"`.
14. Your `checkinDevice` function should return a confirmation message that includes the asset tag.
15. Your `checkinDevice` function should preserve unrelated devices and unchanged fields in the returned ledger.
16. Your `checkinDevice` function should return the ledger unchanged and a message that includes the asset tag when the asset tag is not found.
17. Your `listOverdueDevices` function should return an array.
18. Your `listOverdueDevices` function should return only overdue devices with a status of `"CheckedOut"`.
19. Your `listOverdueDevices` function should return the overdue devices sorted by `dueDate` in ascending order.
20. Your `listOverdueDevices` function should sort correctly even when the month or day is not zero-padded.
21. You should not use the JavaScript `Date` object anywhere in your code.
22. Your `serializeLedger` function should return a JSON string that represents the ledger passed to it.
23. Your `loadLedger` function should return the JavaScript object that the JSON string represents.
