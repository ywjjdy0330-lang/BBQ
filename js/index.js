$(document).ready(function () {

  // 1. 쿠폰 토글
  $('.m_right .mr_top .mrt_bot .coupon > div:first-child').on('click', function () {
    $(this).parent().toggleClass('active');
  });


  // 2. 슬라이더
  const $sliderWrapper = $('.slider-wrapper');
  const $slides = $('.slide');
  const $prevButton = $('.slider-arrow.prev');
  const $nextButton = $('.slider-arrow.next');
  const $dots = $('.dot');

  const slideCount = $slides.length;
  let translateIdx = 1;
  const speedTime = 500;

  const $firstClone = $slides.first().clone();
  const $lastClone = $slides.last().clone();

  $sliderWrapper.append($firstClone);
  $sliderWrapper.prepend($lastClone);

  const newSlideCount = slideCount + 2;
  $sliderWrapper.css({
    'width': `${newSlideCount * 100}%`,
    'transform': `translateX(-${1 * (100 / newSlideCount)}%)`
  });

  function moveSlide(idx) {
    translateIdx = idx;
    $sliderWrapper.css({
      'transition': `transform ${speedTime}ms ease-in-out`,
      'transform': `translateX(-${translateIdx * (100 / newSlideCount)}%)`
    });

    let dotIdx = translateIdx - 1;
    if (dotIdx < 0) dotIdx = slideCount - 1;
    if (dotIdx >= slideCount) dotIdx = 0;

    $dots.removeClass('active');
    $dots.eq(dotIdx).addClass('active');

    if (translateIdx === newSlideCount - 1) {
      setTimeout(() => {
        $sliderWrapper.css({
          'transition': 'none',
          'transform': `translateX(-${1 * (100 / newSlideCount)}%)`
        });
        translateIdx = 1;
      }, speedTime);
    } else if (translateIdx === 0) {
      setTimeout(() => {
        $sliderWrapper.css({
          'transition': 'none',
          'transform': `translateX(-${slideCount * (100 / newSlideCount)}%)`
        });
        translateIdx = slideCount;
      }, speedTime);
    }
  }

  let autoSlideInterval;

  function startAutoSlide() {
    stopAutoSlide(); 
    autoSlideInterval = setInterval(() => {
      moveSlide(translateIdx + 1);
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  $nextButton.on('click', function () {
    stopAutoSlide();
    if (translateIdx >= newSlideCount - 1) return;
    moveSlide(translateIdx + 1);
    startAutoSlide();
  });

  $prevButton.on('click', function () {
    stopAutoSlide();
    if (translateIdx <= 0) return;
    moveSlide(translateIdx - 1);
    startAutoSlide();
  });

  $dots.on('click', function () {
    stopAutoSlide();
    const targetDotIdx = parseInt($(this).data('slide'));
    moveSlide(targetDotIdx + 1);
    startAutoSlide();
  });

  startAutoSlide();


  // 3. 햄버거
  const $aside = $('aside');
  const $overlay = $('.overlay');
  const $btnOpen = $('.mobile-menu-toggle');
  const $btnClose = $('.close');

  function openMenu() {
    $aside.addClass('active');
    $overlay.addClass('active').fadeIn(300);
  }

  function closeMenu() {
    $aside.removeClass('active');
    $overlay.removeClass('active').fadeOut(300);
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


  // 4. 사이드바
  $('.mr_bot .mid, .mr_bot .bot').each(function () {
    const $container = $(this);
    const $prevBtn = $container.find('.btn button:first-child');
    const $nextBtn = $container.find('.btn button:last-child');
    const $currentNumElement = $container.find('.header .counter b');
    const $slides = $container.find('.body .slide-group');
    
    let currentIndex = 0;
    const totalSlides = $slides.length;

    function updateSlider() {
      $slides.removeClass('active');
      $slides.eq(currentIndex).addClass('active');

      if ($currentNumElement.length) {
        $currentNumElement.text((currentIndex + 1) + " ");
      }
    }

    $nextBtn.on('click', function () {
      currentIndex++;
      if (currentIndex >= totalSlides) currentIndex = 0;
      updateSlider();
    });

    $prevBtn.on('click', function () {
      currentIndex--;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      updateSlider();
    });
  });


  // 팝업
  const $popupOverlay = $('.popup_overlay');
  const $closeBtn = $('.pf_right');
  const $checkbox = $('#no-look');

  const hideDate = localStorage.getItem('hidePopupDate');
  const today = new Date().toDateString();

  if (hideDate === today) {
    $popupOverlay.hide();
  } else {
    $popupOverlay.show();
  }

  $closeBtn.on('click', function () {
    if ($checkbox.is(':checked')) {
      localStorage.setItem('hidePopupDate', today);
    }
    $popupOverlay.fadeOut();
  });

});