var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
}

var color = "#faff53";

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function Box() {
	
	this.scale =  c.height / 640;
	this.min_size = 3
	this.max_size = 12
	var	 size_dif = this.max_size - this.min_size;
    this.half_size = ((Math.random() * size_dif) + this.min_size) * this.scale;
    this.x = Math.floor((Math.random() * c.width) + 1);
    this.y = Math.floor((Math.random() * c.height) + 1);
    this.r = 2.2;
	var colorPercentage = (1 - (this.half_size - this.min_size*this.scale)/size_dif/this.scale) * 65;
    this.color = shadeColor(color, -colorPercentage);
	console.log(colorPercentage);

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
		
        var speed = (0.2 + this.half_size*0.08) * this.scale;
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
        ctx.strokeStyle = this.color;
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