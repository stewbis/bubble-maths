/**
 * Namespaces
 */
function Game() {
}
function Questions() {
}
function Bubbles() {
}

/**
 * Game Constants
 */
Game.NUMBER_OF_BUBBLES = 5
Game.BUBBLE_WIDTH = 220
Game.BUBBLE_HEIGHT = 220

/**
 * Game Variables
 */
Game.questions = Array();
Game.bubbles = Array();
Game.current = null;

/**
 * Start the game
 */
Game.start = function(limit, questions) {
  document.getElementById("welcome").style.visibility = "hidden";
  Game.questions = Questions.create(limit, questions);
  Game.startRound(Game.questions.pop());
}

/**
 * Start a round of the game
 */
Game.startRound = function(question) {
  Game.current = question;
  Game.bubbles = Bubbles.create(question);
}

/**
 * Question represents a question and it's solution
 */
function Question(lhs, rhs) {
  this.lhs = lhs
  this.rhs = rhs;
}

/**
 * Factory method to instantiate a bubble
 */
Question.create = function(limit) {
  var rhs = Math.floor(Math.random() * limit) + 1;
  var lhs = Math.floor(Math.random() * limit) + 1;
  return new Question(lhs, rhs);
}

/**
 * Return the correct answer to the question
 */
Question.prototype.answer = function() {
  return this.lhs + this.rhs;
}

/**
 * Create the required number of questions
 */
Questions.create = function(limit, count) {
  var questions = new Array;
  for (i = 0; i < count; ++i) {
    questions[i] = Question.create(limit);
  }
  return questions;
}

/**
 * Bubble represents a solution bubble which moves around the page
 */
function Bubble(id, left, top, question) {
  document.getElementById(id).innerHTML = question.answer();
  this.question = question;
  this.id = id;
  this.left = left;
  this.top = top;
  this.increment = Math.random() >= 0.5 ? 2 : -2;
  this.climbRate = 2 + Math.floor(Math.random() * 3);
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

/**
 * Create the bubbles collection
 */
Bubbles.create = function(question) {
  var bubbles = new Array;
  var left = 0;
  var top = window.innerHeight - Game.BUBBLE_HEIGHT;
  for (i = 0; i < Game.NUMBER_OF_BUBBLES; i++) {
    var bubble = new Bubble("bubble" + i, left, top, question);
    left += Game.BUBBLE_WIDTH
    bubbles[i] = bubble;
    bubble.float();
    bubble.show();
  }
  return bubbles;
}

/**
 * Handle if a bubble is clicked
 */
Bubble.click = function(index) {
  var bubble = Game.bubbles[index];
  if (bubble.isQuestion(Game.current)) {
    while (Game.bubbles.length > 0) {
      Game.bubbles.pop().pop();
    }
  } else {
    bubble.pop();
  }

}