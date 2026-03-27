console.log("Gradebook App" + "\n");

// getAverage function
function getAverage(testScores) {
  let avgScore = 0;
  for (const score of testScores) {
    avgScore += score;
  }
  avgScore /= testScores.length;
  return avgScore;
}

// getAverage function TEST
console.log(`getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]):`);
console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log();

console.log(`getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]):`);
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));
console.log();

console.log(`getAverage([38, 99, 87, 100, 100, 100, 100, 100, 100, 100]):`);
console.log(getAverage([38, 99, 87, 100, 100, 100, 100, 100, 100, 100]));
console.log();

console.log(`getAverage([10, 20, 30, 40, 55, 65, 75, 83]):`);
console.log(getAverage([10, 20, 30, 40, 55, 65, 75, 83]));
console.log();

console.log(`getAverage([10, 20, 30, 40, 50, 60, 70, 97]):`);
console.log(getAverage([10, 20, 30, 40, 50, 60, 70, 97]));
console.log();


// getGrade function
// the if else way is more readable and easier to maintain, but I'm trying to apply the long-lost skill of using the switch statement, which is perfect for this case assuming the score range doesn't change
function getGrade(score) {
  switch(Math.floor(score / 10)) {
    case 10: return "A+";
    case 9: return "A";
    case 8: return "B";
    case 7: return "C";
    case 6: return "D";
    default: return "F";
  }
}

// getGrade function TEST
console.log(`getGrade(100):`);
console.log(getGrade(100));
console.log();

console.log(`getGrade(94):`);
console.log(getGrade(94));
console.log();

console.log(`getGrade(84):`);
console.log(getGrade(84));
console.log();

console.log(`getGrade(74):`);
console.log(getGrade(74));
console.log();

console.log(`getGrade(64):`);
console.log(getGrade(64));
console.log();

console.log(`getGrade(14):`);
console.log(getGrade(14));
console.log();


// hasPassingGrade function
function hasPassingGrade(score) {
  const grade = getGrade(score);
  return typeof grade === "string" && grade !== "F";
}

// hasPassingGrade function TEST
console.log(`hasPassingGrade(94):`);
console.log(hasPassingGrade(94));
console.log();

console.log(`hasPassingGrade(60):`);
console.log(hasPassingGrade(60));
console.log();

console.log(`hasPassingGrade(26):`);
console.log(hasPassingGrade(26));
console.log();


// studentMsg function
function studentMsg(scores, studentScore) {
  if (hasPassingGrade(studentScore)) {
    return `Class average: ${getAverage(scores)}. Your grade: ${getGrade(studentScore)}. You passed the course.`
  }
  if (!hasPassingGrade(studentScore)) {
    return `Class average: ${getAverage(scores)}. Your grade: ${getGrade(studentScore)}. You failed the course.`
  }
}

// studentMsg function TEST
console.log(`studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37):`);
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
console.log();

console.log(`studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100):`);
console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100));
console.log();

console.log(`studentMsg([12, 22, 32, 42, 52, 62, 72, 92], 85):`);
console.log(studentMsg([12, 22, 32, 42, 52, 62, 72, 92], 85));
console.log();

console.log(`studentMsg([15, 25, 35, 45, 55, 60, 70, 60], 75):`);
console.log(studentMsg([15, 25, 35, 45, 55, 60, 70, 60], 75));
console.log();
