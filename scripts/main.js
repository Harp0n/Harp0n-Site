const memberCards = document.querySelector(".team-image-container--images");
const memberInfoName = document.querySelector(".team-member-info--text  h1");
const memberInfoTitle = document.querySelector(".team-member-info--text  h2");
const memberInfoDescription = document.querySelector(  ".team-member-info--text  p");
const memberInfoSkills = document.querySelector(".skills-list");
const memberInfoLinkedIn = document.getElementById('linkedin');
const memberInfoGithub = document.getElementById('github');


console.log(memberInfoLinkedIn);
class memberCard {
  constructor(name, title, description, skills, linkedIn, github) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.skills = skills;
    this.linkedIn = linkedIn;
    this.github = github;
  }
}

const createSkillElement = (skillUrl) => {
  const skillElement = document.createElement("div");
  skillElement.classList.add("skills-list--image");
  // skillElement.setAttribute('background', `url('${skillUrl}')`);
  skillElement.style.backgroundImage = `url('${skillUrl}')`;
  return skillElement;
};

const addSkillsHandler = (skillUrls) => {
  const numberOfColumns = parseInt(Math.log2(skillUrls.length));
  memberInfoSkills.setAttribute(
    "style",
    `grid-template-columns: repeat(${numberOfColumns}, 1fr);`
  );
  console.log(memberInfoSkills);
  for (const skillUrl of skillUrls) {
    const skillEl = createSkillElement(skillUrl);
    memberInfoSkills.append(skillEl);
  }
};

const pawelCard = new memberCard(
  "Paweł Kubala",
  "Harp0n Frontend Developer",
  "IT student at Wroclaw University of Science and Technology. He is sexy and he knows it. ",
  [
    "assets/img/skills/html_logo.png",
    "assets/img/skills/css_logo.png",
    "assets/img/skills/js_logo.png",
    "assets/img/skills/react_logo.png",
  ],
  "https://www.linkedin.com/in/pkubala/",
  "https://github.com/Kubcioo"
);

const radekCard = new memberCard(
  "Radosław Karbowiak",
  "Harp0n Frontend Developer",

  "IT student at Wroclaw University of Science and Technology with working experience. Interested in web technologies.",
  [
    "assets/img/skills/java_logo.png",
    "assets/img/skills/cs_logo.png",
    "assets/img/skills/sql_logo.png",
    "assets/img/skills/html_logo.png",
    "assets/img/skills/css_logo.png",
    "assets/img/skills/js_logo.png",
    "assets/img/skills/ts_logo.png",
    "assets/img/skills/nodejs_logo.png",
    "assets/img/skills/nodejs_logo.png",
  ],
  "https://www.linkedin.com/in/radoslaw-karbowiak/",
  "https://github.com/Reevo55"
);

const memberCardsArray = [radekCard, pawelCard];
console.log(memberCardsArray);

memberCards.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    const activeMemberCard = event.target.closest("div");
    for (const child of memberCards.children) {
      child.classList.remove("yellow-background");
    }

    activeMemberCard.classList.add("yellow-background");
    const activeMemberProps =
      memberCardsArray[parseInt(activeMemberCard.dataset.id)];
    const {
      name,
      title,
      description,
      skills,
      linkedIn,
      github,
    } = activeMemberProps;
    while (memberInfoSkills.firstChild) {
      memberInfoSkills.lastChild.remove();
      // memberInfoSkills.removeChild(memberInfoSkills.firstChild);
    }
    addSkillsHandler(skills);
    memberInfoName.innerHTML = name;
    memberInfoDescription.innerHTML = description;
    memberInfoTitle.innerHTML = title;
    memberInfoLinkedIn.href = linkedIn; 
    memberInfoGithub.href = github; 
  }
});
