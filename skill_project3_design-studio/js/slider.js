const sliderImages = document.querySelectorAll('.completed-projects__image');
const sliderBox = document.querySelector('.slider__img-box');
const sliderBullets = document.querySelectorAll('.slider__bullet');
const sliderTextButtons = document.querySelectorAll('.completed-projects__slider-btn');
const sliderLeft = document.querySelector('.slider__left');
const sliderRight = document.querySelector('.slider__right');
const cityText = document.querySelector('.completed-projects__city-text');
const areaText = document.querySelector('.completed-projects__area-text');
const timeText = document.querySelector('.completed-projects__time-text');

const section = document.querySelector('.completed-projects');

city = ["Rostov-on-Don Admiral", "Sochi Vorovskogo", "Rostov-on-Don Patriotic"];
area = ["81 m2", "105 m2", "93 m2"];
time = ["3.5 months", "4 months", "3 months"];

let sliderCounter = 0;
let sliderWidth;

window.addEventListener('resize', showSlide);

sliderRight.addEventListener('click', nextSlide);
sliderLeft.addEventListener('click', prevSlide);

sliderBox.addEventListener('mousedown', nextSlide);

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
  sliderBox.style.width = sliderWidth * sliderImages.length + 'px';
  sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

  rollSlider();
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

function activateSlide(index) {
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

