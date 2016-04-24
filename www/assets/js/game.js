/**
 * Game represents a game of bubble maths
 */
function Game(bubbles) {
	this.bubbles = bubbles;
}

/**
 * Factory method to instantiate a bubble maths game
 */
Game.create = function(table, count, container) {
	var left = 50;
	var bubbles = new Array;
	var top = window.innerHeight - 250;
	for (i = 0; i < count; i++) {
		bubbles[i] = Bubble.create(i, left, top, container);
		left += 225;
	}
	return new Game(bubbles);
}
