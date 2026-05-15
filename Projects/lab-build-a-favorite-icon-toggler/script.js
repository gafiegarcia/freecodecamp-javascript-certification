const icons = document.querySelectorAll(".favorite-icon")

function toggleIcon(element) {
  element.classList.toggle("filled");
  element.classList.contains("filled")
    ? element.innerHTML = "&#10084;"
    : element.innerHTML = "&#9825;";
  console.log("toggled!")
}

icons.forEach(element => {
  element.addEventListener("click", () => {
    toggleIcon(element);
  })    
});
