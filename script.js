const carouselRow = document.querySelector(".slides-row");
const carouselSlides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const container = document.querySelector(".container");
let index = 1;
var width;

function slideWidth () {
    width = carouselSlides[0].clientWidth;
}
slideWidth();
window.addEventListener('resize', slideWidth)
carouselRow.style.transform = `translateX(-${width * index}px)`;
changeDotsIndex();

nextBtn.addEventListener("click", nextSlides);

function nextSlides() {
  if (index >= carouselSlides.length - 1) return;

  carouselRow.style.transition = "0.3s ease-in";
  index++;
  carouselRow.style.transform = `translateX(-${width * index}px)`;
  changeDotsIndex();
}

prevBtn.addEventListener("click", prevSlides);

function prevSlides() {
  if (index <= 0) return;

  carouselRow.style.transition = "0.3s ease-in";
  index--;
  carouselRow.style.transform = `translateX(-${width * index}px)`;
  changeDotsIndex();
}

carouselRow.addEventListener("transitionend", () => {
  if (carouselSlides[index].id === "firstImgDuplicate") {
    carouselRow.style.transition = "none";
    index = carouselSlides.length - index;
    carouselRow.style.transform = `translateX(-${width * index}px)`;
    changeDotsIndex();
  }
  if (carouselSlides[index].id === "lastImgDuplicate") {
    carouselRow.style.transition = "none";
    index += carouselSlides.length - 2;
    carouselRow.style.transform = `translateX(-${width * index}px)`;
    changeDotsIndex();
  }
});

// autoslide feature
function autoSlide() {
  deletelInterval = setInterval(timer, 3000);
  function timer() {
    nextSlides();
  }
}
autoSlide();

container.addEventListener("mouseover", () => {
  clearInterval(deletelInterval);
});

container.addEventListener("mouseout", () => {
  autoSlide();
});

// changing dots bg color
function changeDotsIndex() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  if(index == 0) {
    dots[4].className += " active"; 
  } else if(index == carouselSlides.length - 1) {
    dots[0].className += " active";  
  } else {
      dots[index - 1].className += " active";
  }
}
