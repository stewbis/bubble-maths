/**
 * Questions represents a collection of Question and performs operations which affect multiple questions
 */
function Questions() {
}

/**
 * Create a random array of questions
 * 
 * @param lMin the lowest number to use for the left-hand side
 * @param lMax the highest number to use for the left-hand side
 * @param rMin the lowest number to use for the right-hand side
 * @param rMax the highest number to use for the right-hand side
 * @param count the number of questions to return
 * @param operator the operation to perform e.g. Opertions.ADDITION
 */
Questions.createRandom = function(lMin, lMax, rMin, rMax, count, operator) {
  var all = Questions.createAll(lMin, lMax, rMin, rMax, operator);
  all.sort(function() {
    return .5 - Math.random();
  });
  return all.slice(0, count);
}

/**
 * Create an array of questions containing all question combinations up to the limits
 * 
 * @param lMin the lowest number to use for the left-hand side
 * @param lMax the highest number to use for the left-hand side
 * @param rMin the lowest number to use for the right-hand side
 * @param rMax the highest number to use for the right-hand side
 * @param operator the operation to perform e.g. Opertions.ADDITION
 */
Questions.createAll = function(lMin, lMax, rMin, rMax, operator) {
  var all = new Array();
  for (i = lMin; i <= lMax; ++i) {
    for (j = rMin; j <= rMax; ++j) {
      all.push(new Question(i, j, operator))
    }
  }
  return all;
}

/**
 * Question represents a question and it's solution
 */
function Question(lhs, rhs, operator) {
  this.operator = operator
  this.lhs = lhs
  this.rhs = rhs;
}

/**
 * Return the correct answer to the question
 */
Question.prototype.answer = function() {
  return this.operator.operation(this.lhs,this.rhs);
}

/**
 * Return a textual description of this question
 */
Question.prototype.describe = function() {
  return this.lhs + " " + this.operator.symbol + " " + this.rhs;
}

/**
 * Return the right-hand side value
 */
Question.prototype.rhs = function() {
  return this.rhs;
}

/**
 * Return the left-hand side value
 */
Question.prototype.lhs = function() {
  return this.lhs;
}

/**
 * Return the operation symbol
 */
Question.prototype.symbol = function() {
  return this.operator.symbol;
}

