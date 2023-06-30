const cards = document.querySelectorAll('.gallery__card');
const pictures = document.querySelectorAll('.gallery__img');
const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.slider__container');
const sliderBtnLeft = document.querySelector('.slider__btn_left');
const sliderBtnRight = document.querySelector('.slider__btn_right');
const sliderBtnClose = document.querySelector('.slider__btn_close');
  
let cardIndex = 0;
let pictureFull = null;
let newPictureFull = null;

cards.forEach((item, index) => {
  item.addEventListener('click', () => {
    cardIndex = index;
    showPicture();
  });
});

const showPicture = () => {
  pictureFull = pictures[cardIndex].cloneNode();
  sliderContainer.append(pictureFull);
  slider.classList.remove('hidden');
}

const changePicture = (dir) => {
  if (dir === 'left') {
    cardIndex > 0 ? cardIndex-- : cardIndex = cards.length - 1;
  } else if (dir === 'right') {
    cardIndex < cards.length - 1 ? cardIndex++ : cardIndex = 0;
  } else {
    return;
  }

  newPictureFull = pictures[cardIndex].cloneNode();

  pictureFull.replaceWith(newPictureFull);
  pictureFull = newPictureFull;
}

const closeSlider = () => {
  pictureFull && pictureFull.remove();
  newPictureFull && newPictureFull.remove();
  slider.classList.add('hidden');
}

sliderBtnLeft.addEventListener('click', () => changePicture('left'));
sliderBtnRight.addEventListener('click', () => changePicture('right'));

sliderBtnClose.addEventListener('click', () => closeSlider());

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    closeSlider();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowLeft') {
    changePicture('left')
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight') {
    changePicture('right')
  }
});