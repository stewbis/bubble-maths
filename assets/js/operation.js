/**
 * Operator represents the mathematical operation to perform
 */
function Operation(symbol, operation) {
	this.operation = operation
	this.symbol = symbol
}

/**
 * Return the operation
 */
Operation.prototype.apply = function(lhs, rhs) {
	return this.operation(lhs, rhs);
}

/**
 * Return the symbol
 */
Operation.prototype.symbol = function() {
	return this.symbol;
}

/**
 * Operations
 */
Operation.MULTIPLICATION = new Operation("*", function(a, b) { return a * b; })
Operation.DIVISION = new Operation("/", function(a, b) {return a / b;})
Operation.SUBTRACTION = new Operation("-", function(a, b) {return a - b;})
Operation.ADDITION = new Operation("+", function(a, b) {return a + b;})