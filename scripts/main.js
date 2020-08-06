let mobileNav = $(".mobile-nav").first();
let toggleButton = $(".toggle-btn").first();
let canvas = $("#canvas").first(); 

mobileNav.css("display", "none"); 

toggleButton.click(function() {
    // mobileNav.style.display = 'block';
    // backdrop.style.display = 'block';
    if(mobileNav.hasClass("active")) {
        mobileNav.removeClass("active"); 
        canvas.removeClass("canvas--blurred");
        setTimeout(function () {
            mobileNav.css("display", "none"); 
        }, 300);
    }
    else {
        mobileNav.css("display", "block"); 
        canvas.addClass("canvas--blurred");
        setTimeout(function () {
            mobileNav.addClass("active");
        }, 10);
    }
});