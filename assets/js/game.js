/**
 * Namespaces
 */
function Game() {}

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
Game.answers = Array();
Game.current = null;
Game.difficulty = 1;
Game.wrong = 0;
Game.right = 0;
Game.startTs = Date.now();
Game.endTs = Date.now();

/**
 * Start the game
 * 
 * @param lMin the lowest number to use for the left-hand side
 * @param lMax the highest number to use for the left-hand side
 * @param rMin the lowest number to use for the right-hand side
 * @param rMax the highest number to use for the right-hand side
 * @param questions the number of questions to return
 * @param operator the operation to perform e.g. Opertions.ADDITION
 */
Game.start = function(lMin, lMax, rMin, rMax, questions, difficulty, operation) {
  document.getElementById("welcome").style.visibility = "hidden";
  Game.difficulty = difficulty;
  Game.questions = Questions.createRandom(lMin, lMax, rMin, rMax, questions, operation);
  Game.answers = Questions.createAll(lMin, lMax, rMin, rMax, operation);
  Game.wrong = 0;
  Game.right = 0;
  Game.startTs = Date.now();
  Game.startRound(Game.questions.shift());
}

/**
 * Start a round of the game by taking a random question from the pool
 */
Game.startRound = function(question) {
  var answers = Game.answers.slice().sort(function() {
    return .5 - Math.random();
  }).slice(0, 5);
  var correct = Math.floor(Math.random() * 5);
  answers[correct] = question;
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("question").innerHTML = "<p>What is " + question.describe() + "</p>";
  Game.current = question;
  Game.bubbles = Bubbles.create(answers);
}

/**
 * End the game
 */
Game.end = function() {
  Game.endTs = Date.now();
  document.getElementById("question").style.visibility = "hidden";
  document.getElementById("welcome").style.visibility = "visible";
  document.getElementById("welcome-text").innerHTML = "You got " + Game.right
      + " correct answers and "
      + Game.wrong
      + " wrong answers in "
      + ((Game.endTs - Game.startTs) / 1000)
      + " seconds";
}