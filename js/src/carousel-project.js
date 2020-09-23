const projectMainElements = document.querySelectorAll(
  ".carousel-item"
);
const rightArrowElement = document.querySelector(".arrow-right");
const leftArrowElement = document.querySelector(".arrow-left");
const projectsLength = projectMainElements.length;
const animationTime = 500;
let index = Array.from(projectMainElements).findIndex((element) =>
  element.classList.contains("active")
);

const projectAnimationHandler = (projectIndex, backwards = false) => {
  rightArrowElement.disabled = true;
  leftArrowElement.disabled = true;
  const fadeOutProjectElement = projectMainElements[projectIndex];

  const nextProjectIndex = backwards
    ? (projectIndex - 1 + projectsLength) % projectsLength
    : (projectIndex + 1) % projectsLength;
  const fadeInProjectElement = projectMainElements[nextProjectIndex];

  const animation = new Promise((resolve, reject) => {
    fadeOutProjectElement.classList.add(
      `fade-out${backwards ? "-backwards" : ""}`
    );
    fadeInProjectElement.classList.toggle("active");
    fadeInProjectElement.classList.add(
      `fade-in${backwards ? "-backwards" : ""}`
    );

    setTimeout(() => {
      fadeOutProjectElement.classList.remove(
        `fade-out${backwards ? "-backwards" : ""}`
      );
      fadeOutProjectElement.classList.toggle("active");
      fadeInProjectElement.classList.remove(
        `fade-in${backwards ? "-backwards" : ""}`
      );
      resolve("successfully animated projects switch!");
    }, animationTime);
  });
  return animation;
};

async function nextProject() {
  rightArrowElement.removeEventListener("click", nextProject);
  leftArrowElement.removeEventListener("click", lastProject);
  projectMainElements[index].removeEventListener('swiped-left', nextProject);
  projectMainElements[index].removeEventListener('swiped-right', lastProject);
  await projectAnimationHandler(index);
  index++;
  index %= projectsLength;
  rightArrowElement.addEventListener("click", nextProject);
  leftArrowElement.addEventListener("click", lastProject);
  projectMainElements[index].addEventListener('swiped-left', nextProject);
  projectMainElements[index].addEventListener('swiped-right', lastProject);
}

async function lastProject() {
  rightArrowElement.removeEventListener("click", nextProject);
  leftArrowElement.removeEventListener("click", lastProject);
  projectMainElements[index].removeEventListener('swiped-left', nextProject);
  projectMainElements[index].removeEventListener('swiped-right', lastProject);
  await projectAnimationHandler(index, true);
  index--;

  if (index < 0) {
    index = projectsLength - 1;
  }
  rightArrowElement.addEventListener("click", nextProject);
  leftArrowElement.addEventListener("click", lastProject);
  projectMainElements[index].addEventListener('swiped-left', nextProject);
  projectMainElements[index].addEventListener('swiped-right', lastProject);
}

rightArrowElement.addEventListener("click", nextProject);
leftArrowElement.addEventListener("click", lastProject);


const test = document.querySelector('.test');

projectMainElements[index].addEventListener('swiped-left', nextProject);
projectMainElements[index].addEventListener('swiped-right', lastProject);
console.log(projectMainElements)
// for(let i = 0; i < projectMainElements.length; i++) {
//   console.log(projectMainElements[i])
//   projectMainElements[i].addEventListener('swiped-left', nextProject);
//   projectMainElements[i].addEventListener('swiped-right', lastProject);
// }

