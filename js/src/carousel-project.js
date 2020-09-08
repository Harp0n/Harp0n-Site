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
  await projectAnimationHandler(index);
  index++;
  index %= projectsLength;
  rightArrowElement.addEventListener("click", nextProject);
  leftArrowElement.addEventListener("click", lastProject);
}

async function lastProject() {
  rightArrowElement.removeEventListener("click", nextProject);
  leftArrowElement.removeEventListener("click", lastProject);
  await projectAnimationHandler(index, true);
  index--;

  if (index < 0) {
    index = projectsLength - 1;
  }
  console.log("test");
  rightArrowElement.addEventListener("click", nextProject);
  leftArrowElement.addEventListener("click", lastProject);
}

rightArrowElement.addEventListener("click", nextProject);
leftArrowElement.addEventListener("click", lastProject);
