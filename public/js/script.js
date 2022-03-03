var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

$("#toggleView").click(() => {
  $("#mobile-nav").toggleClass("none");
});

$("#toggleNav").click(() => {
  $("#mobile-nav").toggleClass("none");
});
