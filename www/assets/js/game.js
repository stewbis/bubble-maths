/**
 * Game represents a game of bubble maths
 */
function Game(bubbles) {
	this.bubbles = bubbles;
}

/**
 * Factory method to instantiate a bubble maths game
 */
Game.create = function(table, numberOfBubbles, container) {

	var first = Math.floor(Math.random() * 10) + 1;
	var second = Math.floor(Math.random() * 10) + 1;
	var correct = first + second;
	var answers = [ first + second ];
	for (i = 1; i < numberOfBubbles; i++) {
		answers[i] = (Math.floor(Math.random() * 10) + 1) + (Math.floor(Math.random() * 10) + 1);
	}

	var left = 0;
	var bubbles = new Array;
	var top = window.innerHeight - 250;
	for (i = 0; i < numberOfBubbles; i++) {
		bubbles[i] = Bubble.create(answers[i], correct == answers[i], left, top, container);
		left += 220;
	}
	return new Game(bubbles);
}
