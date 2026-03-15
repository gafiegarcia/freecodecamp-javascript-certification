function booWho(x) {
  return (typeof x) === "boolean" 
    ? true 
    : false;
}

console.log(booWho(true));
console.log(booWho(false));
console.log(booWho(5));
console.log(booWho("gugu"));
