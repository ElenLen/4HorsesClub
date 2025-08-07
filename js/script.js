const carousel = document.getElementById("carousel-participants");
const items = carousel.querySelectorAll(".carousel__item");
const btnNext = document.querySelector(".carousel__btn-next");
const btnPrev = document.querySelector(".carousel__btn-prev");
const counterText = document.querySelector(".carousel__controls-text span");
const width = window.innerWidth;

const total = items.length;
let visible = 3;
let index = 0;

if (width <= 380) {
  visible = 1;
}

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

setInterval(nextSlide, 4000);

updateButtons();

if (width <= 380) {
  const btnNextText = document.querySelector(".table__btn-next");
  const btnPrevText = document.querySelector(".table__btn-prev");
  const slideItems = document.querySelectorAll(".slider-item");
  const slideCircle = document.querySelectorAll(".circle");

  let currentIndex = 0;
  const totalText = 5;
  let indx = 0;

  function showItem(indx) {
    const targetClass = `cell-${indx + 1}`;
    slideItems.forEach((block, i) => {
      if (block.classList.contains(targetClass)) {
        block.classList.add("active");
      } else {
        block.classList.remove("active");
      }
    });

    slideCircle.forEach((item, i) => {
      item.classList.toggle("active", i === indx);
    });
  }

  function updateButtonsText() {
    if (currentIndex === 0) {
      btnPrevText.classList.add("disabled");
    } else {
      btnPrevText.classList.remove("disabled");
    }

    if (currentIndex >= totalText - 1) {
      btnNextText.classList.add("disabled");
    } else {
      btnNextText.classList.remove("disabled");
    }
  }

  btnPrevText.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalText) % totalText;
    updateButtonsText();
    showItem(currentIndex);
  });

  btnNextText.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalText;
    updateButtonsText();
    showItem(currentIndex);
  });

  updateButtonsText();
  showItem(currentIndex);
}
