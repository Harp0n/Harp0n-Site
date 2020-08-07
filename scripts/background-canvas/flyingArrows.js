let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let arrowImage = new Image();
arrowImage.src = "pictures/background-canvas/harp0nArrow.png";

let scale =  c.height / 640;
let maxSize = 130;
let minSize = 30;
let howManyArrowsOnScreen = 75;
let speedModifier = 0.20;
// let color = "#faff53";


let arrows = [];


function resize() {
    let arrow = c.getBoundingClientRect();
    c.width = arrow.width;
    c.height = arrow.height;
}

class Arrow {
    arrowSize_y = ((Math.random() * (maxSize - minSize)) + minSize) * scale;
    arrowSize_x = this.arrowSize_y * 1.5;

    x = Math.floor((Math.random() * window.innerWidth) + 1);
    y = Math.floor((Math.random() * window.innerHeight) + 1);

    move = function () {
		
        let speed = (this.arrowSize_x * speedModifier) * scale;
        this.x += speed;
        this.y += speed;
    }

    draw = function () {        
        ctx.drawImage(arrowImage, this.x, this.y, this.arrowSize_x, this.arrowSize_y);

        if (this.y > c.height) {
            this.y -= c.height + 100 + Math.random() * 10;
        }
        if (this.x > c.width) {
            this.x -= c.width + 100 + Math.random() * 10;
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (let i = 0; i < arrows.length; i++) {
        arrows[i].move();
    };

    for (let i = 0; i < arrows.length; i++) {
        arrows[i].draw();
    };

    requestAnimationFrame(draw);
}


while(arrows.length < howManyArrowsOnScreen) {
    arrows.push(new Arrow());
}
resize();
draw();

window.onresize = resize;
