console.log("—— Book Organizer ——\n");

const books = [
  {
    title: "Naruto",
    authorName: "Masashi Kishimoto",
    releaseYear: 1999,
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    authorName: "J.K. Rowling",
    releaseYear: 1999,
  },
  {
    title: "Make Time",
    authorName: "Jake Knapp, John Zeratsky",
    releaseYear: 2018,
  },
  {
    title: "Feeling Good",
    authorName: "David D. Burns",
    releaseYear: 1980,
  },
];

function sortByYear(first, second) {
  if (first.releaseYear < second.releaseYear) return -1;
  else if (first.releaseYear > second.releaseYear) return 1;
  return 0;
}

const filteredBooks = books.filter(book => book.releaseYear <= 2015);
filteredBooks.sort(sortByYear);

console.log("filteredBooks:\n");
console.log(filteredBooks);

// gpt-5.5 elegant solution
// function sortByYear(bookA, bookB) {
//   if (bookA.releaseYear < bookB.releaseYear) {
//     return -1;
//   }

//   if (bookA.releaseYear > bookB.releaseYear) {
//     return 1;
//   }

//   return 0;
// }

// const filteredBooks = books
//   .filter(book => book.releaseYear <= 2015)
//   .sort(sortByYear);
