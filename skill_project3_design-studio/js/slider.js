const sliderImages = document.querySelectorAll('.completed-projects__image');
const sliderBox = document.querySelector('.slider__img-box');
const sliderBullets = document.querySelectorAll('.slider__bullet');
const sliderTextButtons = document.querySelectorAll('.completed-projects__slider-btn');
const sliderLeft = document.querySelector('.slider__left');
const sliderRight = document.querySelector('.slider__right');

let sliderCounter = 0;
let sliderWidth;

window.addEventListener('resize', showSlide);

sliderRight.addEventListener('click', nextSlide);
sliderLeft.addEventListener('click', prevSlide);

sliderBox.addEventListener('mousedown', nextSlide);

function showSlide() {
  sliderWidth = document.querySelector('.slider').offsetWidth;
  sliderBox.style.width = sliderWidth * sliderImages.length + 'px';
  sliderImages.forEach(item => item.style.width = sliderWidth + 'px');

  rollSlider();
}

showSlide()

function nextSlide() {
  sliderCounter++;
  if (sliderCounter >= sliderImages.length) sliderCounter = 0;
  rollSlider()
}

function prevSlide() {
  sliderCounter--;
  if (sliderCounter < 0) sliderCounter = sliderImages.length - 1;
  rollSlider()
}

function rollSlider() {
  sliderBox.style.transform = `translateX(${-sliderCounter * sliderWidth}px)`;
  // sliderBox.scrollTo(sliderCounter*sliderWidth, 0);
}

