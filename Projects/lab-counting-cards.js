let count = 0;

function cardCounter(card) {
  if (2 <= card && card <= 6) {
    count = count + 1; // Should've used increment to be concise. 
  } else if (card === 10 || card === "J" || card === "Q" || card === "K" || card === "A") {
    count = count - 1; // Should have used decrement To be concise 
  } else {count;} // This else line should be deleted. 
  const assistMsg = count > 0 ? "Bet" : "Hold";
  
  return `${count} ${assistMsg}`;
}
// The more elegant approach to the long else if line is [10, "J", "Q", "K", "A"].includes(card) which I'll learn later in Array modules

console.log(cardCounter(7));
console.log(cardCounter(8));
console.log(cardCounter(9));
