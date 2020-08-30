const memberCards = document.querySelector('.team-image-container--images'); 
const name = document.querySelector('.team-member-info--text  h1'); 

const pawel = {
    name: "Paweł Kubala", 
    description: "IT student at Wroclaw University of Science and Technology", 
    skills: ["assets/img/html_logo.png", "assets/img/css_logo.png", "assets/img/js_logo.png", "assets/img/react_logo.png"],
    linkedIn: "https://www.linkedin.com/in/pkubala/",
    github: "https://github.com/Kubcioo",
}


console.log(name.innerHTML)
memberCards.addEventListener('click', event => {
    if (event.target.tagName === "IMG")
    {
        const activeMemberCard = event.target.closest('div');
        for (const child of memberCards.children) {
            child.classList.remove('yellow-background');
        }
        activeMemberCard.classList.add('yellow-background');
        const memberName = activeMemberCard.dataset.name;
        name.innerHTML = memberName;
    }
})

