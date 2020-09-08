const memberCards = document.querySelector(".team-image-container");
const memberInfo = document.querySelector(".team-member-info");
const teamCard = document.getElementById('team-card').content.cloneNode(true); 
memberInfo.append(teamCard);


memberCards.addEventListener("click", (event) => {
  const teamImages = memberCards.querySelector(".team-image-container__images");
  for (const child of teamImages.children) {
    child.classList.remove("yellow-background");
  }
  while (memberInfo.firstChild) {
    memberInfo.lastChild.remove(); 
  }

  if (event.target.tagName === "IMG") {
    const activeMemberCard = event.target.closest("div");
    activeMemberCard.classList.add("yellow-background");
    const memberId = activeMemberCard.dataset.id;
    const memberCard = document.getElementById(`${memberId}-member-card`).content.cloneNode(true);
    memberInfo.append(memberCard);
  } else {
const teamCard = document.getElementById('team-card').content.cloneNode(true); 

    memberInfo.append(teamCard);
  }
});
