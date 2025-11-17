var swiper = new Swiper(".banner .mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

$(function () {
  $('.maps .maps_i .m_button div .mbright').on({
    click: function () {
      $('.maps .maps_i .m_info .m_2').css({
        display: 'flex'
      })
      $('.maps .maps_i .m_button .mbb2').css({
        display: 'flex'
      })
      $('.maps .maps_i .m_button .mbb1').css({
        display: 'none'
      })
      $('.maps .maps_i .m_info .m_1').css({
        display: 'none'
      })
    }
  })
  $('.maps .maps_i .m_button div .mbleft').on({
    click: function () {
      $('.maps .maps_i .m_info .m_2').css({
        display: 'none'
      })
      $('.maps .maps_i .m_button .mbb2').css({
        display: 'none'
      })
      $('.maps .maps_i .m_button .mbb1').css({
        display: 'flex'
      })
      $('.maps .maps_i .m_info .m_1').css({
        display: 'flex'
      })
    }
  })
})

$("nav .menu>li").on({
  mouseenter: function () {
    $(".submenu", this).stop().slideDown(200);
  },
  mouseleave: function () {
    $(".submenu", this).stop().slideUp(500);
  }
})

$(function () {
  $(".ham").on('click', function () {
    $(".m_nav").stop().slideDown(300)
  });
  $(".close").on('click', function () {
    $(".m_nav").stop().slideUp(300)
  });


  $(".m_nav .menu>li").on('click', function () {
    $(this).siblings().find('.submenu').stop().slideUp();
    $(this).children('.submenu').stop().slideToggle();

  });
});

$(function () {
  // aos
  AOS.init({
    disable: function () {
      let maxWidth = 768;
      return window.innerWidth < maxWidth
    }
  });
})

$(function () {

  $(".menu>li").on({
    mouseenter: function () {

      $(".menu>li").removeClass("active");
      $(".submenu").removeClass("active");

      $(this).addClass("active");
      $(this).find(".submenu").addClass("active");
      $(".submenu_bg").addClass("active")
    }
  });

  $("header").on('mouseleave', function () {
    $(".menu>li").removeClass("active");
    $(".submenu").removeClass("active");
    $(".submenu_bg").removeClass("active")
  }); z
});

$(function () {
  $('.top, .m_top').on('click', function () {
    $(window).scrollTop(0)
  })
});

var swiper = new Swiper(".main_i.mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

var swiper = new Swiper(".motto_i.mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});