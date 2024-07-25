const slider = document.querySelector(".slider");
const indicator = document.querySelector(".indicator");
const slideWidth =
  document.querySelector(".slide").offsetWidth +
  parseFloat(getComputedStyle(slider).gap);

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  if (isDown) {
    slideToNearestSlide();
  }
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  if (isDown) {
    slideToNearestSlide();
  }
  isDown = false;
  console.log(isDown);
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  let currentX = e.pageX - slider.offsetLeft;
  let walk = currentX - startX;

  slider.scrollLeft = scrollLeft - walk;
  updateIndicator();
});

function updateIndicator() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
  const indicatorWidth = (indicator.clientWidth / slider.clientWidth) * 100;
  const leftPosition = (percentageScrolled * (100 - indicatorWidth)) / 100;

  indicator.style.left = `${leftPosition}%`;
}

function slideToNearestSlide() {
  const currentScroll = slider.scrollLeft;

  const exactScrollPosition = currentScroll / slideWidth;
  const currentSlideIndex = Math.round(exactScrollPosition);

  const newScrollLeft = currentSlideIndex * slideWidth;

  slider.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
}
