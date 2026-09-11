> Opus 5. Reviewed long after submission — you were already at the Algorithms module,
> but this lab sits back in **JavaScript Objects** (before Loops, before HOFs).
> You deliberately solved it with only what's taught up to that point.

## Findings

### 1. Aliasing bug — the real one

```js
currDevice.borrower = borrower;   // line 45
```

You deep-cloned the ledger, then handed the clone a **reference** to the caller's
object. Mutate `borrower` afterwards and the "immutable" ledger changes too. Verified:

```js
const r = checkoutDevice(equipmentLedger, 2, borrower);
borrower.name = "HACKED";
r.ledger[2].borrower.name;   // → "HACKED"
```

Fix (either works, the second is yours and reads better):

```js
currDevice.borrower.name = borrower.name;
currDevice.borrower.email = borrower.email;
// or
currDevice.borrower = { name: borrower.name, email: borrower.email };
```

The clone *is* real — right up until you assign a reference back into it.
Also fits the module: references-vs-values is what Objects is about.

### 2. Dead guards (lines 77, 98)

Both were added to silence errors whose actual causes you later fixed
(`||` should've been `&&`; bad parsing logic), then never revisited.
`index < result.length` already guarantees `result[index]` exists, so the
`typeof` check and the `?.` can never fire.

Worse: the bare `return` yields `undefined`, and `undefined < 20251130` is silently
`false` — a device would just vanish from the list with no error.

### 3. Split the passes

`listOverdueDevices` braids "which are overdue" and "what order" into one loop.
Two passes is more readable, costs nothing (see below), and later becomes a
one-line swap to `.filter()` / `.sort()`.

Also: the `while` loop re-calls `dateToNumber(result[index].dueDate)` on every
comparison — re-parsing strings already parsed. ~k² wasted string splits.
**That** was the actual performance cost, not the loop count.

## Things to remember

**Spread order — last one wins.**

```js
{ ...ledger, [assetTag]: {...} }   // ✅ copies all, then overwrites #2
{ [assetTag]: {...}, ...ledger }   // ❌ spread buries the change
```

`[assetTag]` in braces = *computed key*. Without brackets you'd get a literal
property named `"assetTag"`. And spread is **shallow** — nested objects are still shared.

**Guard mindset (the biggest takeaway).**

> A guard added to make an error go away isn't a fix — it's a bookmark saying
> "I don't understand this yet." When you understand it, take the bookmark out.

When you add a defensive check *in reaction* to an error, mark it `// guard: why?`
so future-you knows it's provisional.

**Misleading test messages.** "should return an array" failed because the function
**threw** — it never returned at all. Tests name what they *checked*, not what *broke*.
When an assertion fails impossibly, ask "did it even get there?" and check the console.

**Sequential loops add; nested loops multiply.**

```
for(){}  for(){}   →  O(n + m)     ← 2n is still O(n)
for(){ for(){} }   →  O(n × m)
```

| version | cost |
|---|---|
| yours (braided) | O(n + k²) |
| split into two passes | O(n + k²) — **identical** |
| `.filter()` + `.sort()` | O(n + k log k) |

So you traded readability for a win that rounds to zero, and missed the real k² cost.
**Don't guess where the cost is — write the readable version, measure, then optimize.**

## On the hand-rolled sort

Not a finding. Sorting objects *by a field* needs a comparator callback, which is a
whole module later — so placing each item as you find it is the honest in-bounds answer.

Possible intended solution (unconfirmed): **integer-like object keys enumerate in
ascending numeric order**, so an object can sort itself.

```js
Object.keys({ 20251130: a, 20251031: b, 20240105: c })
// → ['20240105', '20251031', '20251130']   ← free sort
```

Very Objects-module ("use an object as a lookup"). But it's a spec quirk —
string keys keep insertion order, integer-like keys get reordered. Fragile.
Real code sorts explicitly, so your version is the more defensible engineering.

## Kept doing right

- Guard clauses first, happy path unindented at the bottom
- Cloned *after* the guards, not before — no wasted clone on a rejected request
- `year * 10000 + month * 100 + day`: month maxes at 1200, day at 31, so they can
  never carry into the next place. `Number()` strips zero-padding for free.
- Consistent `{ ledger, message }` shape on every path, error paths included
- Holding the curriculum boundary on purpose. Reaching for `.filter()` would've
  passed the tests while skipping the thing the lab exists to teach.
