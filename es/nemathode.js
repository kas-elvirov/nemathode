import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';

function initDefaultConfig() {
  return {
    mathConstants: {
      'E': Math.E,
      'LN2': Math.LN2,
      'LN10': Math.LN10,
      'LOG10E': Math.LOG10E,
      'LOG2E': Math.LOG2E,
      'PI': Math.PI,
      'SQRT1_2': Math.SQRT1_2,
      'SQRT2': Math.SQRT2
    },
    functions: {
      'abs': {
        implementation: Math.abs
      },
      'min': {
        implementation: Math.min
      },
      'areEqual': {
        implementation: function implementation() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return args.every(function (v) {
            return v === args[0];
          });
        }
      }
    },
    toInputType: function toInputType(val) {
      return val;
    },
    toOutputValue: function toOutputValue(val) {
      return val;
    },
    binaryOperators: {
      '+': {
        precedence: 1,
        implementation: function implementation(l, r) {
          return l + r;
        }
      },
      '-': {
        precedence: 1,
        implementation: function implementation(l, r) {
          return l - r;
        }
      },
      '*': {
        precedence: 2,
        implementation: function implementation(l, r) {
          return l * r;
        }
      },
      '/': {
        precedence: 2,
        implementation: function implementation(l, r) {
          return l / r;
        }
      },
      '%': {
        precedence: 2,
        implementation: function implementation(l, r) {
          return l % r;
        }
      }
    }
  };
}

var INITIAL_CONFIG = initDefaultConfig();

function getUnexpectedOperatorError(operator, position) {
  return new SyntaxError("It's just unexpected operator " + operator + " at position " + position + ". '\n\t\t+ 'Remove it from there");
}
function getUnknownOperandTypeAtOperatorPosition(operand, position) {
  return new SyntaxError("You are using unknown operand <" + operand + "> at position '\n\t\t+ '" + position + ".'\n\t\t+ '\n1. most likely you missed the operator between expressions'\n\t\t+ '\n2. or you forgot to define your implementation for this operator");
}
function getUnknownOperandTypeAtNumberPosition(operand, position) {
  return new SyntaxError("You are using unknown operand <" + operand + "> at position " + position + ".'\n\t\t+ '\n1. most likely you missed to write a number or expression'\n\t\t+ '\n2. or you forgot to cast string to number");
}

var OperandType;

(function (OperandType) {
  OperandType["Number"] = "NUMBER";
  OperandType["Function"] = "FUNCTION";
  OperandType["Expression"] = "EXPRESSION";
  OperandType["MathConstantName"] = "MATH_CONSTANT";
  OperandType["BinaryOperator"] = "BINARY_OPERATOR";
})(OperandType || (OperandType = {}));
/**
 * ========= State =========
*/


var EvaluationStage;

(function (EvaluationStage) {
  EvaluationStage[EvaluationStage["LeftOperandProcessing"] = 1] = "LeftOperandProcessing";
  EvaluationStage[EvaluationStage["OperatorProcessing"] = 2] = "OperatorProcessing";
  EvaluationStage[EvaluationStage["ReadyToCalcXValue"] = 3] = "ReadyToCalcXValue";
  EvaluationStage[EvaluationStage["AllOperandsAreProcessed"] = 4] = "AllOperandsAreProcessed";
})(EvaluationStage || (EvaluationStage = {}));

function initDefaultState() {
  return {
    operandsProcessedAlready: 0,
    evaluationStage: EvaluationStage.LeftOperandProcessing,
    memoizedLValue: undefined,
    memoizedRValue: undefined,
    memoizedBinaryOperator: undefined // TODO

  };
}

var INITIAL_STATE = initDefaultState();

function next(state) {
  state.operandsProcessedAlready += 1;
}

var evaluateAstWithInitialState = function evaluateAstWithInitialState(ast, config) {
  return evaluateAst(_objectSpread({}, INITIAL_STATE), ast, config);
};
var evaluateAst = function evaluateAst(state, ast, config) {
  while (false === state.operandsProcessedAlready >= ast.length) {
    var currentToken = ast[state.operandsProcessedAlready];

    switch (state.evaluationStage) {
      /**
       * 1st
      */
      case EvaluationStage.LeftOperandProcessing:
        switch (currentToken.type) {
          case OperandType.MathConstantName:
          case OperandType.Number:
            state.evaluationStage = EvaluationStage.OperatorProcessing;
            state.memoizedLValue = config.toInputType(currentToken.value);
            next(state);
            break;

          case OperandType.Function:
            {
              var functionValueForToken = currentToken.value;
              var value = config.functions[functionValueForToken.name].implementation.apply(undefined, functionValueForToken.args);
              state.evaluationStage = EvaluationStage.OperatorProcessing;
              state.memoizedLValue = config.toInputType(value);
              next(state);
              break;
            }

          case OperandType.Expression:
            {
              state.evaluationStage = EvaluationStage.OperatorProcessing;
              state.memoizedLValue = config.toInputType(evaluateAstWithInitialState(currentToken.value, config));
              next(state);
              break;
            }

          case OperandType.BinaryOperator:
            {
              var position = state.operandsProcessedAlready;
              throw getUnexpectedOperatorError(currentToken.value, position);
            }
        }

        break;

      /**
       * 2nd
      */

      case EvaluationStage.OperatorProcessing:
        switch (currentToken.type) {
          case OperandType.BinaryOperator:
            state.evaluationStage = EvaluationStage.ReadyToCalcXValue;
            state.memoizedBinaryOperator = currentToken.value;
            next(state);
            break;

          case OperandType.Expression:
          case OperandType.MathConstantName:
          case OperandType.Number:
            {
              var _position = state.operandsProcessedAlready;
              throw getUnknownOperandTypeAtOperatorPosition(currentToken.value, _position);
            }
        }

        break;

      /**
       * 3rd
      */

      case EvaluationStage.ReadyToCalcXValue:
        switch (currentToken.type) {
          case OperandType.MathConstantName:
          case OperandType.Number:
            state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
            state.memoizedRValue = config.toInputType(currentToken.value);
            next(state);
            break;

          case OperandType.Function:
            {
              var _functionValueForToken = currentToken.value;

              var _value = config.functions[_functionValueForToken.name].implementation.apply(undefined, _functionValueForToken.args);

              state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
              state.memoizedRValue = config.toInputType(_value);
              next(state);
              break;
            }

          case OperandType.Expression:
            state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
            state.memoizedRValue = config.toInputType(evaluateAstWithInitialState(currentToken.value, config));
            next(state);
            break;

          case OperandType.BinaryOperator:
            {
              var _position2 = state.operandsProcessedAlready;
              throw getUnknownOperandTypeAtNumberPosition(currentToken.value, _position2);
            }
        }

        break;

      /**
       * 4th
      */

      case EvaluationStage.AllOperandsAreProcessed:
        {
          switch (currentToken.type) {
            case OperandType.BinaryOperator:
              {
                var currentOperator = currentToken.value;
                var previousOperator = state.memoizedBinaryOperator;
                var currentPrecedence = config.binaryOperators[previousOperator].precedence;
                var nextPrecedence = config.binaryOperators[currentOperator].precedence;

                if (currentPrecedence >= nextPrecedence) {
                  state.evaluationStage = EvaluationStage.ReadyToCalcXValue;
                  state.memoizedLValue = config.binaryOperators[previousOperator].implementation(state.memoizedLValue, state.memoizedRValue);
                  state.memoizedBinaryOperator = currentOperator;
                  state.memoizedRValue = undefined;
                  next(state);
                } else {
                  var newState = {
                    evaluationStage: EvaluationStage.ReadyToCalcXValue,
                    operandsProcessedAlready: state.operandsProcessedAlready + 1,
                    memoizedLValue: state.memoizedRValue,
                    memoizedBinaryOperator: currentOperator,
                    memoizedRValue: undefined
                  };
                  state.evaluationStage = EvaluationStage.AllOperandsAreProcessed;
                  state.memoizedRValue = config.toInputType(evaluateAst(newState, ast, config));
                  state.operandsProcessedAlready = newState.operandsProcessedAlready;
                }

                break;
              }
          }

          break;
        }
    }
  }
  /**
   * TODO
   * case with expression where only one function was provided
   * for example: ['areEqual', 1, 1, 1, 1]
  */


  if (!state.memoizedBinaryOperator) {
    return config.toOutputValue(state.memoizedLValue);
  }

  return config.toOutputValue(config.binaryOperators[state.memoizedBinaryOperator].implementation(state.memoizedLValue, state.memoizedRValue));
};

/**
 * Compute the edit distance between the two given strings
 *
 * @param {*} source
 * @param {*} target
 *
 * @return {number}
 */
function getDistance(source, target) {
  if (source.length === 0) return target.length;
  if (target.length === 0) return source.length;
  var i;
  var j;
  var matrix = [];

  for (i = 0; i <= target.length; i++) {
    matrix[i] = [i];
  }

  for (j = 0; j <= source.length; j++) {
    matrix[0][j] = j;
  } // Fill in the rest of the matrix


  for (i = 1; i <= target.length; i++) {
    for (j = 1; j <= source.length; j++) {
      if (target.charAt(i - 1) === source.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
        Math.min(matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j] + 1)); // deletion
      }
    }
  }

  return matrix[target.length][source.length];
}

function compareSusggestions(a, b) {
  return a.distance - b.distance;
}

function filterSuggestions(suggestions) {
  return suggestions.filter(function (suggestion) {
    return suggestion.distance < suggestion.source.length || suggestion.suggestion.includes(suggestion.source);
  });
}

function getDistances(operand, possibleNames) {
  var suggestions = [];

  for (var i = 0; i < possibleNames.length; ++i) {
    var suggestion = possibleNames[i];
    var distance = getDistance(operand, suggestion);
    var suggestionDictionary = {
      source: operand,
      suggestion: suggestion,
      distance: distance
    };
    suggestions.push(suggestionDictionary);
  }

  return filterSuggestions(suggestions);
}

function _getSuggestionForOperand(operand, possibleSuggestions) {
  var metacollection = possibleSuggestions.map(function (collection) {
    return getDistances(operand, collection);
  }).filter(function (collection) {
    return collection.length > 0;
  });
  var flattenArr = [];

  for (var i = 0; i < metacollection.length; ++i) {
    for (var j = 0; j < metacollection[i].length; ++j) {
      flattenArr.push(metacollection[i][j]);
    }
  }

  return flattenArr.sort(compareSusggestions);
}

function getSuggestionForOperand(operand, possibleSuggestions) {
  var suggestions = _getSuggestionForOperand(operand, possibleSuggestions);

  var cannotFind = "Cannot find operand --> " + operand + ".\n";
  var assumptionAboutThisError = 'Most likely you made a mistake when you were writing the operand' + ' or you forgot to cast string to number.\n';

  if (suggestions.length === 0) {
    var emptySuggestionsList = 'There are nothing even remotely close to your ' + 'input in config you passed :(';
    return cannotFind + assumptionAboutThisError + emptySuggestionsList;
  }

  var list = suggestions.reduce(function (acc, curr) {
    return acc + "\t" + curr.suggestion + "\n";
  }, '');
  var suggestionsTitle = 'Maybe you want to use on of the following?\n';
  return cannotFind + assumptionAboutThisError + suggestionsTitle + list;
}

function getUnknownOperandType(operand, config) {
  return new SyntaxError(getSuggestionForOperand(operand, [Object.keys(config.functions), Object.keys(config.mathConstants), Object.keys(config.binaryOperators)]));
}

function getUnexpectedExpressionFormatError() {
  return new SyntaxError('It looks like you passed expression with wrong format:' + '\n1. Check your expression, please' + '\n2. Check TS configuration');
}
function getErrorForAnEmptyExpression() {
  return new SyntaxError('It looks like you passed an empty expression' + '\n1. Please check your expression');
}

function getAst(expression, config) {
  if (!Array.isArray(expression)) {
    throw getUnexpectedExpressionFormatError();
  }

  if (expression.length === 0) {
    throw getErrorForAnEmptyExpression();
  }

  var ast = [];

  for (var i = 0; i < expression.length; ++i) {
    if (typeof expression[i] === 'number') {
      var token = {
        type: OperandType.Number,
        value: expression[i]
      };
      ast.push(token);
      continue;
    }

    var isString = typeof expression[i] === 'string';

    if (isString && config.binaryOperators[expression[i]]) {
      var _token = {
        type: OperandType.BinaryOperator,
        value: expression[i]
      };
      ast.push(_token);
      continue;
    }

    if (isString && config.mathConstants[expression[i]]) {
      var _token2 = {
        type: OperandType.MathConstantName,
        value: config.mathConstants[expression[i]]
      };
      ast.push(_token2);
      continue;
    }

    if (Array.isArray(expression[i]) && typeof expression[i][0] === 'string' && config.functions[expression[i][0]]) {
      var functionExpression = [].concat(expression[i]);
      var functionName = functionExpression.shift();
      var functionArguments = [].concat(functionExpression);
      var tokenValue = {
        name: functionName,
        args: functionArguments
      };
      var _token3 = {
        type: OperandType.Function,
        value: tokenValue
      };
      ast.push(_token3);
      continue;
    }

    var astLen = ast.length;
    var isArgumentsOperand = astLen > 0 && ast[astLen - 1].type === OperandType.Function; // skip arguments for function (we handled them in the previous step)

    if (isArgumentsOperand) {
      continue;
    }

    if (Array.isArray(expression[i])) {
      var _token4 = {
        type: OperandType.Expression,
        value: getAst(expression[i], config)
      };
      ast.push(_token4);
      continue;
    }

    throw getUnknownOperandType(expression[i], config);
  }

  return ast;
}

/**
 * Private
*/

var _Nemathode = function _Nemathode(config) {
  var _this = this;

  this.evaluate = function (expression) {
    var ast = getAst(expression, _objectSpread({}, _this.config));
    var result = evaluateAstWithInitialState([].concat(ast), _objectSpread({}, _this.config));
    return result;
  };

  this.evaluatePlease = function (expression) {
    console.info('🤗'); // eslint-disable-line

    return _this.evaluate(expression);
  };

  this.evaluateAst = function (ast) {
    var result = evaluateAstWithInitialState([].concat(ast), _objectSpread({}, _this.config));
    return result;
  };

  this.getAst = function (expression) {
    var ast = getAst(expression, _objectSpread({}, _this.config));
    return ast;
  };

  this.config = config;
  this.mathConstants = config.mathConstants;
};
/**
 * Public
*/


function Nemathode(config) {
  return new _Nemathode({
    mathConstants: (config == null ? void 0 : config.mathConstants) || INITIAL_CONFIG.mathConstants,
    functions: (config == null ? void 0 : config.functions) || INITIAL_CONFIG.functions,
    binaryOperators: (config == null ? void 0 : config.binaryOperators) || INITIAL_CONFIG.binaryOperators,
    toInputType: (config == null ? void 0 : config.toInputType) || INITIAL_CONFIG.toInputType,
    toOutputValue: (config == null ? void 0 : config.toOutputValue) || INITIAL_CONFIG.toOutputValue
  });
}

export default Nemathode;
