# JS Type Coercion

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

## Arithmetic (`+`, `-`, `*`, `/`, `%`, `**`)

- **`+` with a string on either side?** The string wins: convert the other side to a string and **join**.
- **`+` otherwise, and every other arithmetic operator?** Convert both sides to numbers, then do the math.
- Works **left to right, one pair at a time**, so order matters.
- **`NaN` is contagious:** any math with `NaN` gives `NaN`.

```js
"5" + 1        // "51"
"5" - 1        // 4
"2" ** 3       // 8
1 + 2 + "3"    // "33"  → 3 + "3"
"1" + 2 + 3    // "123" → "12" + 3
undefined + 1  // NaN
```

## Converting to a number

The same conversion is used by arithmetic, relational comparisons, `Number(x)`, and **unary plus** `+x`:

| Value | → Number |
|---|---|
| `true` / `false` | `1` / `0` |
| `null` | `0` |
| `undefined` | `NaN` |
| `""` | `0` 😬 |
| `" 12 "` | `12` (edge spaces ignored) |
| `"12px"`, `"abc"` | `NaN` |

- **Unary `+`** (one value, no left side): `+"42"` → `42`. Unary `-` converts and flips: `-"5"` → `-5`. `Number(x)` does the same and is easier to read.
- **`parseInt` / `parseFloat`** are looser: they read digits from the start and stop at the first non-digit. `+"12px"` → `NaN`, but `parseInt("12px")` → `12`.

```js
("b" + "a" + +"a" + "a").toLowerCase()   // → ?
1 + +"2"                                  // → ?
"3" * "4" + "5"                           // → ?
```

## Rule of thumb

Use `===` / `!==` and compare values of the same type. Truthy ≠ `== true`.

Convert on purpose with `Number()` / `String()` before doing math. Input values are **always strings**, so `"5" + 1` quietly gives `"51"`.
