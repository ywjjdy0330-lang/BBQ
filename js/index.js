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
$(document).ready(function() {
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

  $btnOpen.on('click', function(e) {
    e.preventDefault();
    openMenu();
  });

  $btnClose.on('click', function() {
    closeMenu();
  });

  $overlay.on('click', function() {
    closeMenu();
  });
});