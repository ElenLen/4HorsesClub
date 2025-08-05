const carousel = document.getElementById("carousel-participants");
const items = carousel.querySelectorAll(".carousel__item");
const btnNext = document.querySelector(".carousel__btn-next");
const btnPrev = document.querySelector(".carousel__btn-prev");
const counterText = document.querySelector(".carousel__controls-text span");

const total = items.length;
const visible = 3;
let index = 0;

function updateCarousel() {
  const shift = (100 / visible) * index;
  carousel.style.transform = `translateX(-${shift}%)`;

  let current = Math.min(index + visible, total);
  counterText.textContent = `${current}`;

  btnPrev.disabled = index === 0;
  btnNext.disabled = index >= total - visible;
}

function updateButtons() {
  if (index === 0) {
    btnPrev.classList.add("disabled");
  } else {
    btnPrev.classList.remove("disabled");
  }

  if (index >= total - visible) {
    btnNext.classList.add("disabled");
  } else {
    btnNext.classList.remove("disabled");
  }
}

function nextSlide() {
  index = index + 1 > total - visible ? 0 : index + 1;
  updateCarousel();
}

function prevSlide() {
  index = index - 1 < 0 ? total - visible : index - 1;
  updateCarousel();
}

btnNext.addEventListener("click", () => {
  if (index < total - visible) {
    index++;
    updateButtons();
    updateCarousel();
  }
});

btnPrev.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateButtons();
    updateCarousel();
  }
});

let auto = setInterval(nextSlide, 4000);

function resetAuto() {
  clearInterval(auto);
  auto = setInterval(nextSlide, 4000);
}

updateButtons();
