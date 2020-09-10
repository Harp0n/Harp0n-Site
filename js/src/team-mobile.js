const membersList = document.querySelectorAll('.team-mobile__members div');

// create team card element
const card = document.getElementById('team-card').content.cloneNode(true);
const team = membersList[0];
team.append(card.querySelector('.team-member-info__text'));
team.append(card.querySelector('.team-member-info__contact'));


// create team member element
for (let i = 1; i < membersList.length; i++) {
    member = membersList[i];
    const memberId = member.dataset.id;
    const memberCard = document.getElementById(`${memberId}-member-card`).content.cloneNode(true);
    const image = document.createElement('img');
    image.src = `assets/img/original_team_imgs/${memberId}.jpg`
    member.append(image);
    member.append(memberCard.querySelector('.team-member-info__text'));
    member.append(memberCard.querySelector('.team-member-info__contact'));
}