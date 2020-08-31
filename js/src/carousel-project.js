const projectMainElements = document.querySelectorAll(".project--carousel__item");
const rightArrowElement = document.querySelector(".arrow-right");
const leftArrowElement = document.querySelector(".arrow-left");
const projectsLength = projectMainElements.length;
let index = Array.from(projectMainElements).findIndex(element => element.classList.contains("active"));

function nextProject() {
    projectMainElements[index].classList.remove("active");
    $('.active').animate( {width: "0px"});

    index++;

    if (index >= projectsLength) {
        index = 0;
    }

    projectMainElements[index].classList.add("active");

}


function lastProject() {
    projectMainElements[index].classList.remove("active");
    index--;

    if (index < 0) {
        index = projectsLength - 1;
    }

    projectMainElements[index].classList.add("active");
}

rightArrowElement.addEventListener("click", nextProject);
leftArrowElement.addEventListener("click", lastProject);
