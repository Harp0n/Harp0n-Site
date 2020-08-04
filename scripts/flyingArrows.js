var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
}

var color = "#faff53";

function Box() {

    this.half_size = Math.floor((Math.random() * 15) + 5);
    this.x = Math.floor((Math.random() * c.width) + 1);
    this.y = Math.floor((Math.random() * c.height) + 1);
    this.r = 2.2;
    this.color = color;

    this.getDots = function () {

        var full = (Math.PI * 2) / 4;


        var p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r)
        };
        var p2 = {
             x: this.x + this.half_size * 2 * Math.sin(this.r + full),
             y: this.y + this.half_size * 2 * Math.cos(this.r + full)
        };
        var p3 = {
          x: p1.x,
          y: p1.y + this.half_size * 2
        };

        // var p4 = {
        //     x: this.x + this.half_size * Math.sin(this.r + full * 3),
        //     y: this.y + this.half_size * Math.cos(this.r + full * 3)
        // };

        return { 
            p1: p1,
            p2: p2,
            p3: p3
            // p4: p4
        };
    }
    this.rotate = function () {
        var speed = 0.1 + this.half_size*0.11;
        this.x += speed;
        this.y += speed;
    }
    this.draw = function () {
        var dots = this.getDots();
        ctx.beginPath();
        ctx.moveTo(dots.p1.x, dots.p1.y);
        ctx.lineTo(dots.p3.x, dots.p3.y);
        ctx.lineTo(dots.p2.x, dots.p2.y);
        // ctx.lineTo(dots.p4.x, dots.p4.y);
        ctx.strokeStyle = color;
        ctx.stroke();


        if (this.y - this.half_size > c.height) {
            this.y -= c.height + 100;
        }
        if (this.x - this.half_size > c.width) {
            this.x -= c.width + 100;
        }
    }
}

var boxes = [];

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].rotate();
    };

    for (var i = 0; i < boxes.length; i++) {
        //collisionDetection(i)
        boxes[i].draw();
    };
    requestAnimationFrame(draw);
}

resize();
draw();

while (boxes.length < 100) {
    boxes.push(new Box());
}

window.onresize = resize;


function collisionDetection(b) {
    for (var i = boxes.length - 1; i >= 0; i--) {
        if (i != b) {
            var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
            var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < boxes[b].half_size + boxes[i].half_size) {
                boxes[b].half_size = boxes[b].half_size > 1 ? boxes[b].half_size -= 1 : 1;
                boxes[i].half_size = boxes[i].half_size > 1 ? boxes[i].half_size -= 1 : 1;
            }
        }
    }
}