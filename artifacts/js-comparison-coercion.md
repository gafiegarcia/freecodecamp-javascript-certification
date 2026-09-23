# JS Comparison Coercion

## Loose equality (`==`)

1. **Same type?** Compare directly, like `===`.
2. **`null` or `undefined`?** They equal each other and nothing else.
3. **Boolean on either side?** Convert it to a number (`true` → `1`, `false` → `0`), then compare again.
4. **String vs number?** Convert the string to a number.
5. **`NaN` anywhere?** Always `false`, even `NaN == NaN`.

```js
"0" == false        // true  → "0" == 0 → 0 == 0
"bolobolo" == true  // false → "bolobolo" == 1 → NaN == 1
```

## Relational (`<`, `>`, `<=`, `>=`)

- **Both strings?** Compare character by character (alphabetically). No number conversion.
- **Anything else?** Convert both sides to numbers, then compare.
  - Booleans still become `1` / `0`, and `NaN` still makes every comparison `false`.
  - `null` becomes `0` here (no special case like in `==`), and `undefined` becomes `NaN`.

```js
"10" < "9"   // → ?
"10" < 9     // → ?
null >= 0    // → ?
null == 0    // false
```

## Rule of thumb

Use `===` / `!==` and compare values of the same type. Truthy ≠ `== true`.
