const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxTransitionDuration = parseFloat(getComputedStyle(lightbox).getPropertyValue("transition-duration")) * 1000;
const lightboxImg = document.getElementById("lightbox-image");
const lightboxCloseBtn = document.getElementById("close-btn");

const openLightbox = (e) => {
  const fullSizeImg = e.target.src.split("-thumbnail").join(""); // Claude Review: should've just used .replace() instead of two methods like that.
  lightbox.classList.add("show");
  lightboxImg.src = fullSizeImg;
};

const closeLightbox = (e) => { // Claude Review: drop the param ffs. not even used.
  lightbox.classList.remove("show");
  setTimeout(() => {
    lightboxImg.src = "";
  }, lightboxTransitionDuration);
};


gallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery-item")) { // prevents click on gallery itself (padding) from being a trigger
    openLightbox(e);
  }
})

lightbox.addEventListener("click", (e) => {
  console.log(e.target);
  console.log(e.target.closest("#close-btn"));
  if (e.target === lightbox || e.target.closest("#close-btn") === lightboxCloseBtn) {  // Claude Review: redundant check; .closest() will be truthy if the target can reach #close-btn, and the truthiness is enough of a check; lightboxCloseBtn is not even needed as a variable -> e.target.closest("#close-btn") is enough check
    
    closeLightbox(e);
  }
})

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === 'Escape') {
    closeLightbox(e);
  }
})

// console.log(parseFloat(lightboxTransitionDuration) * 1000);


// HAVEN'T BEEN TAUGHT BUT REALLY NEED TO LEARN FOR THIS PROJECT:
/*
  1. focus management: move focus, trap focus, return focus
  2. how to make long if conditions more readable
  3. make images focusable with keyboard nav but not with mouse
  4. css anchor-position so that I can animate the image going from and to their exact position in gallery 👀

*/

// both the fcc example and my code have AWFUL UX for keyboard nav
// I think fcc is being intentional here by requiring the use of a "custom modal" instead of built-in html <dialog> (with nice .showModal() .close() ezpz)


