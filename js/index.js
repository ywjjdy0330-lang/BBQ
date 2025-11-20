document.addEventListener('DOMContentLoaded', () => {

  // 1. 쿠폰 토글
  const couponHeaders = document.querySelectorAll('.m_right .mr_top .mrt_bot .coupon > div:first-child');

  couponHeaders.forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('active');
    });
  });


  // 2. 슬라이더
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.slider-arrow.prev');
  const nextButton = document.querySelector('.slider-arrow.next');
  const dots = document.querySelectorAll('.dot');

  const slideCount = slides.length;
  let translateIdx = 1;
  const speedTime = 500;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);

  sliderWrapper.appendChild(firstClone);
  sliderWrapper.insertBefore(lastClone, slides[0]);

  const newSlideCount = slideCount + 2;
  sliderWrapper.style.width = `${newSlideCount * 100}%`;
  sliderWrapper.style.transform = `translateX(-${1 * (100 / newSlideCount)}%)`;

  function moveSlide(idx) {
    translateIdx = idx;
    sliderWrapper.style.transition = `transform ${speedTime}ms ease-in-out`;
    sliderWrapper.style.transform = `translateX(-${translateIdx * (100 / newSlideCount)}%)`;

    let dotIdx = translateIdx - 1;
    if (dotIdx < 0) dotIdx = slideCount - 1;
    if (dotIdx >= slideCount) dotIdx = 0;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[dotIdx]) dots[dotIdx].classList.add('active');

    if (translateIdx === newSlideCount - 1) {
      setTimeout(() => {
        sliderWrapper.style.transition = 'none';
        translateIdx = 1;
        sliderWrapper.style.transform = `translateX(-${translateIdx * (100 / newSlideCount)}%)`;
      }, speedTime);
    } else if (translateIdx === 0) {
      setTimeout(() => {
        sliderWrapper.style.transition = 'none';
        translateIdx = slideCount;
        sliderWrapper.style.transform = `translateX(-${translateIdx * (100 / newSlideCount)}%)`;
      }, speedTime);
    }
  }

  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      moveSlide(translateIdx + 1);
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  nextButton.addEventListener('click', () => {
    stopAutoSlide();
    if (translateIdx >= newSlideCount - 1) return;
    moveSlide(translateIdx + 1);
    startAutoSlide();
  });

  prevButton.addEventListener('click', () => {
    stopAutoSlide();
    if (translateIdx <= 0) return;
    moveSlide(translateIdx - 1);
    startAutoSlide();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      stopAutoSlide();
      const targetDotIdx = parseInt(e.target.dataset.slide);
      moveSlide(targetDotIdx + 1);
      startAutoSlide();
    });
  });

  startAutoSlide();
});


// 3. 햄버거
$(document).ready(function () {
  const $aside = $('aside');
  const $overlay = $('.overlay');
  const $body = $('body');
  const $btnOpen = $('.mobile-menu-toggle');
  const $btnClose = $('.close');

  function openMenu() {
    $aside.addClass('active');
    $overlay.addClass('active');
  }

  function closeMenu() {
    $aside.removeClass('active');
    $overlay.removeClass('active');
  }

  $btnOpen.on('click', function (e) {
    e.preventDefault();
    openMenu();
  });

  $btnClose.on('click', function () {
    closeMenu();
  });

  $overlay.on('click', function () {
    closeMenu();
  });
});

// 4. 사이드바
function setupMiniSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const prevBtn = container.querySelector('.btn button:first-child');
  const nextBtn = container.querySelector('.btn button:last-child');
  const currentNumElement = container.querySelector('.header .counter b');


  const slides = container.querySelectorAll('.body .slide-group');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {

    slides.forEach(slide => slide.classList.remove('active'));

    slides[currentIndex].classList.add('active');

    if (currentNumElement) {
      currentNumElement.textContent = (currentIndex + 1) + " ";
    }
  }


  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= totalSlides) currentIndex = 0;
    updateSlider();
  });


  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    updateSlider();
  });
}

// 팝업
document.addEventListener('DOMContentLoaded', () => {
  setupMiniSlider('.mr_bot .mid');
  setupMiniSlider('.mr_bot .bot');
});

const popupOverlay = document.querySelector('.popup_overlay');
const closeBtn = document.querySelector('.pf_right');
const checkbox = document.querySelector('#no-look');

const hideDate = localStorage.getItem('hidePopupDate');
const today = new Date().toDateString();

if (hideDate === today) {
  popupOverlay.style.display = 'none';
} else {
  popupOverlay.style.display = 'block';
}

closeBtn.addEventListener('click', function () {

  if (checkbox.checked) {
    localStorage.setItem('hidePopupDate', today);
  }

  popupOverlay.style.display = 'none';
});