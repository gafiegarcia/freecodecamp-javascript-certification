console.log("Odd Fibonacci Sum Calculator" + "\n");

/*
FIRST WORKING SOLUTION

function sumFibs(num) {
  const fibSequence = [0];
  
  for (let i = 1; fibSequence[i - 1] <= num; i++) {
    if (i < 2) {
      // console.log(`i: ${i}`)
      fibSequence.push(i)
      // console.log(`fibSequence: ${fibSequence}`)
    } else if (fibSequence[i - 2] + fibSequence[i - 1] <= num) {
      // console.log(`i: ${i}`)
      fibSequence.push(fibSequence[i - 2] + fibSequence[i - 1]);
      // console.log(`fibSequence: ${fibSequence}`)
    }
  }

  // console.log(`fibSequence: ${fibSequence}`);
  
  const oddFib = [];
  for (const num of fibSequence) {
    if (num % 2 !== 0) {
      oddFib.push(num)
    }
  }
  // console.log(`oddFib: ${oddFib}`);

  let sum = 0;
  for (const num of oddFib) {
    sum += num;
  }
  
  return sum;
}
*/

/*
SECOND WORKING SOLUTION

function sumFibs(num) {
  const fibSequence = [0];
  let sumOdd = 0;
  
  for (let i = 1; fibSequence[i - 1] <= num; i++) {
    if (i < 2) {
      fibSequence.push(i);
      sumOdd += i; 
    } else if (fibSequence[i - 2] + fibSequence[i - 1] <= num) {
      let nextFibNumber = fibSequence[i - 2] + fibSequence[i - 1];
      fibSequence.push(nextFibNumber);
      if (nextFibNumber % 2 !== 0) {
        sumOdd += nextFibNumber;
      }
    }
  }
  
  return sumOdd;
}
*/

function sumFibs(num) {
  let sumOdd = 0;
  let prev = 0;
  let curr = 1;
  
  while (curr <= num) {
    if (curr % 2 > 0) {
      sumOdd += curr;
      console.log("Now sum is: " + sumOdd)
    }
    [prev, curr] = [curr, prev + curr]
  }
  
  return sumOdd;
}

// tests
console.log(`sumFibs(1):`);
console.log(sumFibs(1));
console.log();

// console.log(`sumFibs(1000):`);
// console.log(sumFibs(1000));
// console.log();

// console.log(`sumFibs(4000000):`);
// console.log(sumFibs(4000000));
// console.log();

// console.log(`sumFibs(4):`);
// console.log(sumFibs(4));
// console.log();

// console.log(`sumFibs(75024):`);
// console.log(sumFibs(75024));
// console.log();

// console.log(`sumFibs(75025):`);
// console.log(sumFibs(75025));
// console.log();
