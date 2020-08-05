var mobileNav = document.querySelector(".mobile-nav");
var toggleButton = document.querySelector(".toggle-btn");

mobileNav.style.display = "none"; 

toggleButton.addEventListener("click", function() {
    // mobileNav.style.display = 'block';
    // backdrop.style.display = 'block';
    if(mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active"); 
        setTimeout(function () {
            mobileNav.style.display = "none"; 
        }, 300);
    }
    else {
        mobileNav.style.display = "block";
        setTimeout(function () {
            mobileNav.classList.add("active");
        }, 10);
    }
  });