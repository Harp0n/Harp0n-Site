var mobileNav = document.querySelector(".mobile-nav");
var toggleButton = document.querySelector(".toggle-btn");


toggleButton.addEventListener("click", function() {
    // mobileNav.style.display = 'block';
    // backdrop.style.display = 'block';
    mobileNav.classList.toggle("active");

  });