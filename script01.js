const showOnDisplay = document.querySelector(".display");
const specialChars = "/x-+%.";
const numberEntry = "1234567890";
let calculateData = [];
showOnDisplay.innerHTML = 0;


/**
 * добавление значения по ключам
 * @param {*} event 
 */
function handleKey(event) {
  const numbersKey = {
    96: 0,
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    111: "/",
    106: "x",
    109: "-",
    107: "+",
    13: getResult,
    27: clearInputField,
    8: removeLastCharacter,
    
  };

  if (event.keyCode == 13 || event.keyCode == 27 || event.keyCode == 8) {
    numbersKey[event.keyCode]();
  } else {
    addCharToDisplay(numbersKey[event.keyCode])
  }
    //numbersKey[event.keyCode];

  

  //addCharToDisplay(numbersKey[event.keyCode]);
  
  console.log(event.keyCode, event.code,);
}


/**   Numpad0
 * события с клавиатуры
 * @param {*} event 
 *
function handleKey(event) {
  const numbersKeys = ["96", "97", "2", "3", "4", "5", "6", "7", "8", "9", "/", "*", "+", "-",];
  if (numbersKeys.includes(event.code)) {
    addCharToDisplay(event.code)
  }
  console.log(event.code)
}/*


/**
 * Замена оператора на новый нажатый оператор.
 * @param {String} currentChar
 */
function addCharToDisplay(currentChar) {
  const lastChar = calculateData[calculateData.length - 1];
  const isLastCharSpecial = specialChars.includes(lastChar);
  const isCurrentCharSpecial = specialChars.includes(currentChar);

  if (isLastCharSpecial === false && isCurrentCharSpecial === false) {
    if (lastChar === undefined) {
      calculateData.push(Number(currentChar));
      console.log(calculateData);
    } else {
      const strChars = String(lastChar) + String(currentChar);
      console.log(strChars);

      calculateData[calculateData.length - 1] = Number(strChars);
    }
  } else if (isLastCharSpecial === false && isCurrentCharSpecial === true) {
    calculateData.push(currentChar);
  } else if (isLastCharSpecial === true && isCurrentCharSpecial === true) {
    calculateData.splice(-1, 1, currentChar);
  } else if (isLastCharSpecial === true && isCurrentCharSpecial === false) {
    calculateData.push(currentChar);
  }
  console.log(currentChar, calculateData);
  showOnDisplayChars();
}

/**
 * Вывод на дисплей массива в виде строки.
 */
function showOnDisplayChars() {
  for (let i = 0; i < calculateData.length; i++) {
    if (i === 0) {
      result = calculateData;
    }
    showOnDisplay.innerHTML = result.join("");
  }
}

function clearInputField() {
  showOnDisplay.innerHTML = 0;
  calculateData = [];
  console.log(calculateData);
}

function getPriorityOperatorIndex() {
  const priorityOperators = ["/", "x", "-", "+"];
  for (let operator of priorityOperators) {
    let priorityOperatorIndex = calculateData.indexOf(operator);
    if (priorityOperatorIndex !== -1) {
      return priorityOperatorIndex;
    }
  }
  return null;
}

/**
 * Вычисление результата и проверка на процент.
 */
function getResult() {
  if (calculateData.length == 1) {
    showOnDisplay.innerHTML = calculateData[0];
    return;
  }

  let priorityOperatorIndex = getPriorityOperatorIndex();
  if (priorityOperatorIndex === null) {
    console.log("error");
    return;
  }
  
  let operandOne = calculateData[priorityOperatorIndex - 1];
  let operandTwo = calculateData[priorityOperatorIndex +1];

  if (isFinite(operandOne) && isFinite(operandTwo)) {
    let resultOperation = defineOperator(
      operandOne,
      calculateData[priorityOperatorIndex],
      operandTwo
    );

    calculateData.splice(priorityOperatorIndex - 1, 3, resultOperation);
    getResult();
  
    console.log(calculateData);
  }
}

/**
 * патерн стратегия
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 * @returns {Number}
 */
function defineOperator(operandOne, operator, operandTwo) {
  if (operator == "+") {
    return resultPlus(operandOne, operandTwo);
  } else if (operator == "-") {
    return resultMinus(operandOne, operandTwo);
  } else if (operator == "/") {
    return resultDivide(operandOne, operandTwo);
  } else if (operator == "x") {
    return resultMultiply(operandOne, operandTwo);
  }
}

/**
 * Сложение.
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 * @returns {Number}
 */
function resultPlus(operandOne, operandTwo) {
  return operandOne + operandTwo;
}

/**
 * Вычитание
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 * @returns {Number}
 */
function resultMinus(operandOne, operandTwo) {
  return operandOne - operandTwo;
}

/**
 * Умножение.
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 * @returns {Number}
 */
function resultMultiply(operandOne, operandTwo) {
  return operandOne * operandTwo;
}

/**
 * Деление.
 * @param {Number} operandOne
 * @param {string} operator
 * @param {Number} operandTwo
 * @returns {Number}
 */
function resultDivide(operandOne, operandTwo) {
  return operandOne / operandTwo;
}

/**
 * Удаление последнего символа.
 */
function removeLastCharacter() {
  let lastValue = calculateData.splice(-1).toString();
  console.log(lastValue, lastValue.length, calculateData);

  if (lastValue.length > 1) {
    lastValue = lastValue.slice(0, lastValue.length - 1);
    calculateData.push(+lastValue);
    console.log(lastValue, calculateData);
    showOnDisplay.innerHTML = 0;
    showOnDisplayChars();
  } else {
    console.log(calculateData);
    showOnDisplay.innerHTML = 0;
    showOnDisplayChars();
  }
}

/**
 * Код с процентом, проверка что делать с процентом (- + / *).
 */
function executeOperation() {
  if (showOnDisplay.innerHTML.includes("-") === true) {
    minusPercentageAmount();
  }
  if (showOnDisplay.innerHTML.includes("+") === true) {
    plusPercentageAmount();
  }
  if (showOnDisplay.innerHTML.includes("x") === true) {
    multiplyPercentageAmount();
  }
  if (showOnDisplay.innerHTML.includes("/") === true) {
    dividePercentageAmount();
  }
}

/**
 * Отнимать процент.
 * @returns {Number}
 */
function minusPercentageAmount() {
  const deleteChars = calculateData.pop();
  const firstOperatorCharacter = deleteChars.includes("-");
  const indexPercentage = deleteChars.indexOf("-");
  const baseValue = Number(deleteChars.substring(0, indexPercentage));
  const percentValue = Number(deleteChars.substring(indexPercentage + 1));

  if (firstOperatorCharacter === true) {
    return eval(baseValue - (baseValue / 100) * percentValue);
  }
}

/**
 * Складывать процент.
 * @returns {Number}
 */
function plusPercentageAmount() {
  const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
  const firstOperatorCharacter = showOnDisplay.innerHTML.includes("+");
  const indexPercentage = showOnDisplay.innerHTML.indexOf("+");
  const baseValue = Number(deleteChars.substring(0, indexPercentage));
  const percentValue = Number(deleteChars.substring(indexPercentage + 1));

  //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
  if (firstOperatorCharacter === true) {
    return eval((baseValue / 100) * percentValue + baseValue);
  }
}

/**
 * Умножать процент.
 * @returns {Number}
 */
function multiplyPercentageAmount() {
  const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
  const firstOperatorCharacter = showOnDisplay.innerHTML.includes("x");
  const indexPercentage = showOnDisplay.innerHTML.indexOf("x");
  const baseValue = Number(deleteChars.substring(0, indexPercentage));
  const percentValue = Number(deleteChars.substring(indexPercentage + 1));

  //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
  if (firstOperatorCharacter === true) {
    return eval((baseValue / 100) * percentValue * baseValue);
  }
}

/**
 * Делить процент.
 * @returns {Number}
 */
function dividePercentageAmount() {
  //делить процент
  const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
  const firstOperatorCharacter = showOnDisplay.innerHTML.includes("/");
  const indexPercentage = showOnDisplay.innerHTML.indexOf("/");
  const baseValue = Number(deleteChars.substring(0, indexPercentage));
  const percentValue = Number(deleteChars.substring(indexPercentage + 1));

  //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
  if (firstOperatorCharacter === true) {
    return eval(baseValue / ((baseValue / 100) * percentValue));
  }
}

/*
баги, которые нашел: 

если введен только один символ и его удалить с помощью backspace, то этот сивол удаляется
только в массиве, а в дисплее он остается

переделать процент

избавиться от eval

отображение на дисплее скоректировать, что бы большое количество символов  
было внутри рамок дисплея

подумать надо ли выводить подсчет сразу при нажатии на оператора или оставить 
все только в фурнкции результата

при нажатии на минус перед числом, все ломается. надо сделать что бы если 0 индекс это -, 
то число делать отрицательным
*/
