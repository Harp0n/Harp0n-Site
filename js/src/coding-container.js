const codeWriterDiv = document.getElementById("code-writer");
const divCode = document.getElementById('code-write');

const randomTimeBetweenChars = 350;
const codeToWrite = `while (true) { \n HarpOn.create(); \n}`;
const specialCharsRegex = /([^A-Za-z])/g;
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const purpleColorSyntax = ["while", "for"];
const greenColorSyntax = ["true", "false"];
const redColorSyntax = ["create", "code"];

const spaceSpan = document.createElement("span");
spaceSpan.textContent = '|';

let soundSources = ["Keyboard_Button_2-fesliyanstudios.com.mp3", "Keyboard_Button_1-fesliyanstudios.com.mp3", "Mechanical-Keyboard-single-button-presses-1.mp3", "Mechanical-Keyboard-single-button-presses-2.mp3"]
soundSources = soundSources.map(src => {return "assets/sounds/" + src;});

let timeOut = 0;

function codeWriter(code) {
    codeWriterDiv.appendChild(divCode);

    codeArr = code.split('\n');
    writeLines(codeArr)
}

function writeLines(code) {
    for(let i = 0; i < code.length; i++) {
        let currentDiv = htmlDivFactory();
        setTimeout(() => divCode.append(currentDiv), timeOut);

        const codeArr = code[i].split(specialCharsRegex);

        for(const line of codeArr) {
            writeSingleWord(line, currentDiv);
        }

        if(i !== code.length - 1) setTimeout(() => currentDiv.classList.remove('code'), timeOut);
        else {
            setTimeout(() => currentDiv.classList.toggle('code-blink'), timeOut);
        }
    }
}

function writeSingleWord(string, currentDiv) {
    const span = htmlSpanFactory(currentDiv);
    const charArr = string.split("");
    charArr.forEach(char => {
        writeSingleCase(char, span);
    });

    setTimeout(() => htmlColorSeter(string, span), timeOut);
}

async function writeSingleCase(char, span) {
    timeOut += Math.random() * randomTimeBetweenChars + 1;
    setTimeout(function () {
        if (char != " ") {
            playRandomSoundClick();
            span.textContent += char;
        }
        else {
            span.textContent += " ";
        }

    }, timeOut);
}

function htmlSpanFactory(currentDiv) {
    const span = document.createElement('span');
    span.textContent = "";
    currentDiv.append(span);
    return span;
}
function htmlDivFactory() {
    const div = document.createElement('div');
    div.style.margin = 0;
    div.classList.add('code');
    return div;
}

function htmlColorSeter(word, span) {
    if(purpleColorSyntax.includes(word)){
        span.style.color = " #601f7e";
    }
    else if (redColorSyntax.includes(word)){
        span.style.color = "#c25450";
    }
    else if (format.test(word)) {
        span.style.color = "black";
    }
    else {
        span.style.color = "#005b4a";
    }
}

function playRandomSoundClick() {
    var sound = new Howl({
        src: [soundSources[Math.floor(Math.random() * soundSources.length)]],
        volume: 0.005,  
    });

    sound.play();
}


codeWriter(codeToWrite);





