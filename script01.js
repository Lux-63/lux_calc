const showOnDisplay = document.querySelector(".display");
const specialChars = "/*-+%.";
const numberEntry = "1234567890";
let calculateData = [];
showOnDisplay.innerHTML = 0;

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

/**
 * Вычисление результата и проверка на процент.
 */
function getResult() {
  const checkForPercentage = calculateData.includes("%");

  if (checkForPercentage == true) {
    executeOperation(calculateData);
  } else {
    if (calculateData.length == 1) {
      showOnDisplay.innerHTML = calculateData[0];
    }
    for (let i = 0; i < calculateData.length; i++) {
      if (specialChars.includes(calculateData[i]) === true) {
        defineOperator(
          calculateData[i - 1],
          calculateData[i],
          calculateData[i + 1]
        );
      }
    }
  }
  console.log(calculateData);
}

function defineOperator(operandOne, operator, operandTwo) {
  if (operator == "+") {
    return resultPlus(operandOne, operandTwo);
  } else if (operator == "-") {
    return resultMinus(operandOne, operandTwo);
  } else if (operator == "/") {
    return resultDivide(operandOne, operandTwo);
  } else if (operator == "*") {
    return resultMultiply(operandOne, operandTwo);
  }
}

/**
 * Сложение.
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 */
function resultPlus(operandOne, operandTwo) {
  return calculateData.splice(0, 3, operandOne + operandTwo);
}

/**
 * Вычмтание
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 */
function resultMinus(operandOne, operandTwo) {
  // вычитание
  return calculateData.splice(0, 3, operandOne - operandTwo);
}

/**
 * Умножение.
 * @param {Number} operandOne
 * @param {String} operator
 * @param {Number} operandTwo
 */
function resultMultiply(operandOne, operandTwo) {
  return calculateData.splice(0, 3, operandOne * operandTwo);
}

/**
 * Деление.
 * @param {Number} operandOne
 * @param {string} operator
 * @param {Number} operandTwo
 */
function resultDivide(operandOne, operandTwo) {
  // деление
  return calculateData.splice(0, 3, operandOne / operandTwo);
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
  if (showOnDisplay.innerHTML.includes("*") === true) {
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
  //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)

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
  const firstOperatorCharacter = showOnDisplay.innerHTML.includes("*");
  const indexPercentage = showOnDisplay.innerHTML.indexOf("*");
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
