/**
 * Bubble represents a collection of solution bubbles and manages operations across one or more bubbles
 */
function Bubbles() {
}

/**
 * Create the bubbles collection
 */
Bubbles.create = function(answers) {
  var questions = new Array;
  var bubbles = new Array;
  var freespace = (window.innerWidth - (Game.NUMBER_OF_BUBBLES * Game.BUBBLE_WIDTH));
  var spacing = freespace < 0 ? 0 : (freespace / (Game.NUMBER_OF_BUBBLES + 2));
  var left = spacing;
  var top = window.innerHeight - Game.BUBBLE_HEIGHT;
  for (i = 0; i < Game.NUMBER_OF_BUBBLES; i++) {
    var bubble = new Bubble(i, "bubble" + i, left, top, answers[i]);
    left += Game.BUBBLE_WIDTH + spacing;
    bubbles[i] = bubble;
    bubble.float();
    bubble.show();
  }
  return bubbles;
}

/**
 * Bubble represents a solution bubble which moves around the page
 */
function Bubble(index, id, left, top, question) {
	document.getElementById(id).innerHTML = question.answer();
	this.question = question;
	this.id = id;
	this.index = index;
	this.left = left;
	this.top = top;
	this.increment = Math.random() >= 0.5 ? 2 : -2;
	this.climbRate = Game.difficulty + Math.ceil(Math.random() * 2);
	this.changeDirectionInterval = 3
	this.countdown = 10;
	this.timer = null;
}

/**
 * Test if the question is the expected one
 */
Bubble.prototype.isQuestion = function(question) {
	return this.question.answer() == question.answer();
}

Bubble.prototype.show = function() {
	document.getElementById(this.id).style.visibility = "visible";
}

Bubble.prototype.hide = function() {
	document.getElementById(this.id).style.visibility = "hidden";
}

/**
 * Method for floating a bubble up the screent
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
	document.getElementById(this.id).style.visibility = "hidden";
	window.clearTimeout(this.timer);
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
		Bubble.click(this.index);
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

/**
 * Handle if a bubble is clicked
 */
Bubble.click = function(index) {

	var bubble = Game.bubbles[index];
	if (bubble.isQuestion(Game.current)) {
		Game.right++;
		while (Game.bubbles.length > 0) {
			Game.bubbles.shift().pop();
		}
	} else {
		Game.wrong++;
		bubble.pop();
	}

	if (Game.bubbles.length == 0) {
		if (Game.questions.length > 0) {
			Game.startRound(Game.questions.shift());
		} else {
			Game.end();
		}
	}
}
