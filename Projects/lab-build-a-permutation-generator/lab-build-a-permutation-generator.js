console.log("— Permutation Generator —\n");

function permuteString(string, prefix = "", result = []) {
  console.log(
    `\npermuteString(string = ${string}, prefix = ${prefix}, result = ${result})`,
  );

  if (string.length === 0) {
    console.log("Base case reached: ", prefix);
    console.log("result before push: ", result);
    if (!result.includes(prefix)) {
      console.log(`✅ Pushing: ${prefix}`);
      result.push(prefix);
    } else {
      console.log(`❌ Duplicate detected: ${prefix}; not pushing`);
    }
    return result;
  } else {
    const strArray = Array.from(string);
    console.log("strArray: ", strArray);

    for (const [i, ch] of strArray.entries()) {
      // result.push(permuteString(
      //   strArray.toSpliced(i, 1).join(""),
      //   prefix += ch,
      //   result
      // ));

      result.concat(
        permuteString(strArray.toSpliced(i, 1).join(""), prefix + ch, result),
      );
      console.log(`prefix = ${prefix} -> result post-concat = ${result}`);
    }
  }

  return result;
}

console.log(permuteString("fcc"));

// review now move to ./review-notes.md
