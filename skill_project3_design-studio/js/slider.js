const sliderImages = document.querySelectorAll('.completed-projects__image');
const sliderBox = document.querySelector('.slider__img-box');
const sliderBullets = document.querySelectorAll('.slider__bullet');
const sliderTextButtons = document.querySelectorAll('.completed-projects__slider-btn');
const sliderLeft = document.querySelector('.slider__left');
const sliderRight = document.querySelector('.slider__right');
const cityText = document.querySelector('.completed-projects__city-text');
const areaText = document.querySelector('.completed-projects__area-text');
const timeText = document.querySelector('.completed-projects__time-text');

const mobileLeft = document.querySelector('.slider__mobile-left');
const mobileRight = document.querySelector('.slider__mobile-right');

const section = document.querySelector('.completed-projects');

let city = ["Rostov-on-Don Admiral", "Sochi Vorovskogo", "Rostov-on-Don Patriotic"];
let area = ["81 m2", "105 m2", "93 m2"];
let time = ["3.5 months", "4 months", "3 months"];

let sliderCounter = 0;
let sliderWidth;

window.addEventListener('resize', showSlide);

sliderRight.addEventListener('click', nextSlide);
sliderLeft.addEventListener('click', prevSlide);

mobileRight.addEventListener('click', nextSlide);
mobileLeft.addEventListener('click', prevSlide);

// sliderBox.addEventListener('mousedown', nextSlide);

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") {
    nextSlide();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") {
    prevSlide();
  }
});

function showSlide() {
  sliderWidth = document.querySelector('.slider').offsetWidth;

  rollSlider();
  activateSlide();
}

showSlide();

function nextSlide() {
  sliderCounter++;
  if (sliderCounter >= sliderImages.length) sliderCounter = 0;
  rollSlider();
  activateSlide();
}

function prevSlide() {
  sliderCounter--;
  if (sliderCounter < 0) sliderCounter = sliderImages.length - 1;
  rollSlider();
  activateSlide();
}

function rollSlider() {
  sliderBox.style.transform = `translateX(${-sliderCounter * sliderWidth}px)`;

  cityText.textContent = `${city[sliderCounter]}`;
  areaText.textContent = `${area[sliderCounter]}`;
  timeText.textContent = `${time[sliderCounter]}`;
  // sliderBox.scrollTo(sliderCounter*sliderWidth, 0);
}

function activateSlide() {
  sliderBullets.forEach(item => item.classList.remove('slider__bullet_active'));
  sliderTextButtons.forEach(item => item.classList.remove('completed-projects__slider-btn_active'));

  sliderBullets[sliderCounter].classList.add('slider__bullet_active');
  sliderTextButtons[sliderCounter].classList.add('completed-projects__slider-btn_active');
}

sliderBullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    sliderCounter = index;
    rollSlider();
    activateSlide();
  })
})

sliderTextButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    sliderCounter = index;
    rollSlider();
    activateSlide();
  })
})

let isDragging = false;

let x1;
let x2;
let x3;
let offset;

sliderBox.addEventListener('pointerdown', startSwipe);
// sliderBox.addEventListener('pointermove', swipe);
sliderBox.addEventListener('pointerup', endSwipe);
// sliderBox.addEventListener('pointerleave', endSwipe);
// sliderBox.addEventListener('pointercancel', endSwipe);

function startSwipe(e) {
  isDragging = true;
  x1 = e.clientX;
}

function endSwipe(e) {
  isDragging = false;
  x3 = e.clientX;
  offset = x3 - x1;
  if (offset > 0 && Math.abs(offset) > (sliderWidth / 4)) {
    prevSlide();
  } else if (offset < 0 && Math.abs(offset) > (sliderWidth / 4)) {
    nextSlide();
  }
}

// function startSwipe(event) {
//   event.preventDefault();
//   startPos = getPositionX(event);
//   isDragging = true;
// }

// function swipe(event) {
//   if (!isDragging) return;

//   const currentPosition = getPositionX(event);
//   currentTranslate = endPos - startPos;
// }

// function endSwipe(event) {
//   isDragging = false;

//   endPos = getPositionX(event);

//   const sliderWidth = sliderImages[0].clientWidth;
//   const threshold = sliderWidth / 4;

//   if (currentTranslate > threshold) {
//     prevSlide();
//   } else if (currentTranslate < -threshold) {
//     nextSlide();
//   }
// }

// function getPositionX(event) {
//   return event.width;
// }


