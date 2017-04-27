var canvas 	= document.getElementById("canvas");
var context = canvas.getContext("2d");
class rain {
	constructor() {
		this.initialize();
	}
	initialize() {
		this.x 		= Math.random() * window.innerWidth;
		this.y 		= Math.random() * -window.innerHeight;

		this.radius = Math.random() * 3 + 1;
		this.speed 	= Math.random() * 5 + 5;
		this.v_speed = Math.random() * 0.001;
		this.acceleration = 0;
		this.tail = [];
	}
	process() {
		if(this.y < window.innerHeight) {
			this.x 				+= Math.cos(Math.PI * .5 + 0) * this.speed;
			this.y 				+= Math.sin(Math.PI * .5 + 0) * this.speed;

			this.speed 			+=this.acceleration;
			this.acceleration 	+=this.v_speed;
		}
		else {
			this.initialize();
		}

		this.tail.push({ x: this.x, y: this.y });
		if(this.tail.length > 3) 
			this.tail.splice(0, 1);
	}
	render() {
		for(var j = 1, tail_length = this.tail.length; j < tail_length; j++) {
				var percent = j/tail_length;
				context.beginPath();
				context.globalAlpha = percent;
				context.lineWidth = this.radius * percent;
				context.moveTo(this.tail[j-1].x, this.tail[j-1].y);
				context.lineTo(this.tail[j].x, this.tail[j].y);
				context.stroke();
			}
	}
}
class app {
	constructor() {
		this.canvas 	= canvas;
		this.context 	= context;
		this.render 	= this.render.bind(this);
		this.rainList 	= [];

		window.addEventListener("resize", this.resize);

		for(var i = 0; i < 500; i++) 
			this.rainList.push(new rain());		

		this.resize();
		this.render();
	}
	resize() {
		this.center 		= { x: window.innerWidth*.5, y: window.innerHeight*.5 }
		this.canvas.width 	= window.innerWidth;
		this.canvas.height 	= window.innerHeight;
	}
	render() {
		this.context.fillStyle 		= "rgba(255,255,255, 1)";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.fillStyle 		= "#3498db";
		this.context.strokeStyle 	= "#3498db";

		for(var i = 0, length = this.rainList.length; i < length; i++) {
			this.rainList[i].process();
			this.rainList[i].render();
		}
		window.requestAnimationFrame(this.render);
	}
}
new app();