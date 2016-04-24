/**
 * Bubble represents a solution bubble which moves around the page
 */
function Bubble(number, left, top, id) {
	this.id = id;
	this.number = number;
	this.left = left;
	this.top = top;
	this.increment = Math.random() >= 0.5 ? 2 : -2;
	this.climbRate = 2 + Math.floor(Math.random() * 3);
	this.countdown = 10;
	this.timer = null;
}

/**
 * Factory method to instantiate a bubble
 */
Bubble.create = function(number, left, top, container) {
	var id = "bubble" + (Bubble.nextId++);
	var html = "<div id='" + id + "' class='bubble'>" + number + "</div>";
	container.innerHTML += html;
	var bubble = new Bubble(number, left, top, id);
	bubble.position(left, top);
	bubble.float();
	return bubble;
}

/**
 * Static method for floating a bubble up the screent
 */
Bubble.prototype.float = function() {
	var that = this;
	this.timer = window.setInterval(function() {
		that.floatUp();
	}, 50);
}

/**
 * Pop the bubble
 */
Bubble.prototype.pop = function() {
	window.clearTimeout(this.timer);
	document.getElementById(this.id).style.visibility = "hidden";
	var audio = new Audio('./assets/sounds/pop.mp3');
	audio.play();
	window.setTimeout(function() {
		audio.pause();
	}, 200);
}

/**
 * Set the position of the container
 */
Bubble.prototype.position = function(left, top) {
	var element = document.getElementById(this.id);
	element.style.left = left + "px";
	element.style.top = top + "px";
}

/**
 * Float the bubble up the container
 */
Bubble.prototype.floatUp = function() {
	if ((--this.countdown) <= 0) {
		this.increment = Math.random() >= 0.5 ? 2 : -2;
		this.countdown = Math.floor(Math.random() * 20);
	}
	this.left += this.increment;
	this.top -= this.climbRate;
	if (this.top <= 0) {
		this.pop()
	} else if (this.left < 0) {
		this.increment = 2
		this.position(this.left + 2, this.top);
	} else if (this.left + 217 > window.innerWidth) {
		this.increment = -2
		this.position(this.left - 2, this.top);
	} else {
		this.position(this.left, this.top);
	}
}

// ID Counter
Bubble.nextId = 0
