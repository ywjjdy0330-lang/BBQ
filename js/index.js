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

// 4. 사이드바 미니 슬라이더 기능
function setupMiniSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return; 

  const prevBtn = container.querySelector('.btn button:first-child'); // 왼쪽 버튼
  const nextBtn = container.querySelector('.btn button:last-child');  // 오른쪽 버튼
  const currentNumElement = container.querySelector('.header .counter b'); // 숫자 부분
  
  // 해당 박스 안의 모든 slide-group 찾기
  const slides = container.querySelectorAll('.body .slide-group');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    // 1. 싹 다 숨김
    slides.forEach(slide => slide.classList.remove('active'));
    // 2. 현재 순서만 보임
    slides[currentIndex].classList.add('active');
    // 3. 숫자 업데이트
    if(currentNumElement) {
        currentNumElement.textContent = (currentIndex + 1) + " ";
    }
  }

  // 다음 버튼
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= totalSlides) currentIndex = 0;
    updateSlider();
  });

  // 이전 버튼
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    updateSlider();
  });
}

// HTML 로딩 후 실행
document.addEventListener('DOMContentLoaded', () => {
  setupMiniSlider('.mr_bot .mid'); // 위쪽 (새로 나왔어요) 연결
  setupMiniSlider('.mr_bot .bot'); // 아래쪽 (이런 메뉴는 어때요) 연결
});