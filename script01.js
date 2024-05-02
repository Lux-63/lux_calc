document.addEventListener("keydown", handleKey);
const showOnDisplay = document.querySelector(".display");
showOnDisplay.focus();

//основной массив.
let calculateData = [];
//спец.символы для проверки операторов.
const specialChars = "/x-+%.";

const numberEntry = "1234567890";

//отображение нуля, пока нет ввода.
showOnDisplay.innerHTML = 0;
// проверка последовательности решения.
const priorityOperators = [".", "/", "x", "-", "+"];

/**
 * перехват клавиатуры.
 */
const numbersKey = {
  96: () => {
    addCharToDisplay(0);
  },
  97: () => {
    addCharToDisplay(1);
  },
  98: () => {
    addCharToDisplay(2);
  },
  99: () => {
    addCharToDisplay(3);
  },
  100: () => {
    addCharToDisplay(4);
  },
  101: () => {
    addCharToDisplay(5);
  },
  102: () => {
    addCharToDisplay(6);
  },
  103: () => {
    addCharToDisplay(7);
  },
  104: () => {
    addCharToDisplay(8);
  },
  105: () => {
    addCharToDisplay(9);
  },
  48: () => {
    addCharToDisplay(0);
  },
  49: () => {
    addCharToDisplay(1);
  },
  50: () => {
    addCharToDisplay(2);
  },
  51: () => {
    addCharToDisplay(3);
  },
  52: () => {
    addCharToDisplay(4);
  },
  53: () => {
    addCharToDisplay(5);
  },
  54: () => {
    addCharToDisplay(6);
  },
  55: () => {
    addCharToDisplay(7);
  },
  56: () => {
    addCharToDisplay(8);
  },
  57: () => {
    addCharToDisplay(9);
  },
  111: () => {
    addCharToDisplay("/");
  },
  106: () => {
    addCharToDisplay("x");
  },
  109: () => {
    addCharToDisplay("-");
  },
  107: () => {
    addCharToDisplay("+");
  },
  110: () => {
    addCharToDisplay(".");
  },
  108: () => {
    addCharToDisplay(".");
  },
  13: getResult,
  27: clearInputField,
  8: removeLastCharacter,
};

/**
 * добавление значения по ключам.
 * @param {*} event
 */
function handleKey(event) {
  console.log(event.keyCode, event.code);
  event.preventDefault();
  numbersKey[event.keyCode]();
}

/**
 * Замена оператора на новый нажатый оператор.
 * @param {String} currentChar
 */
function addCharToDisplay(currentChar) {
  const lastChar = calculateData[calculateData.length - 1];
  const penultimateChar = calculateData[calculateData.length - 2];
  const isLastCharSpecial = specialChars.includes(lastChar);
  const isCurrentCharSpecial = specialChars.includes(currentChar);

  if (isLastCharSpecial === false && isCurrentCharSpecial === false) {
    if (lastChar === undefined) {
      calculateData.push(Number(currentChar));
      console.log(calculateData);
    } else {
      strChars = String(lastChar) + String(currentChar);
      console.log(strChars);
      calculateData[calculateData.length - 1] = Number(strChars);
    }
  } else if (currentChar === "." && penultimateChar === ".") {
    return;
    //проверка поставлена ли дробь или нет.
  } else if (isLastCharSpecial === false && isCurrentCharSpecial === true) {
    calculateData.push(currentChar);
  } else if (isLastCharSpecial === true && isCurrentCharSpecial === true) {
    if (currentChar === "." && calculateData[calculateData.length - 3] === ".") {
      //тут если эту проверку не сделать то плюс можно заменить точкой.
      return;
    }
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
/**
 * очистка значения
 */
function clearInputField() {
  showOnDisplay.innerHTML = 0;
  calculateData = [];
  console.log(calculateData);
}
/**
 *приоритет операции по правилам. сначала деление, умножение, потом сложение.
 * @returns
 */
function getPriorityOperatorIndex() {
  //делается на нулевой индекс. желательно что бы поиск начинался с 1 индекса
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
  /*  переменная для определения приоритетного оператора. нужна что бы проще было понять.
  в вычислении процента использую operator, так как эта переменная 
  не глобальная. Стоит ли переменную сделать глобальной?  */
  let priorityOperatorIndex = getPriorityOperatorIndex();

  /*переменные операндов. вынести в глобальные переменные, что бы не писать 
  их в функции вычисления на %. Спорный вопрос, надо ли так делать? вынести после части кода строки 203-207*/
  let operandOne = calculateData[priorityOperatorIndex - 1];
  let operandTwo = calculateData[priorityOperatorIndex + 1];
  if (priorityOperatorIndex === null) {
    console.log("error");
    showOnDisplay.innerHTML = "error";
    return;
  }

  //проверка %
  if (calculateData.includes("%") === true) {
    //удаление знака % и передача трех параметров в функцию процента
    calculateData.pop();
    executeOperation(operandOne, calculateData[priorityOperatorIndex], operandTwo);
    console.log("передача в функции %", calculateData);
  }
  // по идее функция после процента продолжается работать дальше. ретёрн нужны или типо того или елси иф
  // взятие чисел для вычисления результата, в зависимости от приоритетного оператора
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
  } else if (operator == ".") {
    return fractions(operandOne, operandTwo);
  }
}
/**
 * сделать дробные числа
 * @param {Number} operandOne
 * @param {Number} operandTwo
 * @returns
 */
function fractions(operandOne, operandTwo) {
  return Number(String(operandOne) + "." + String(operandTwo));
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
 * Код с процентом, проверка что делать с процентом (- + / *). переименовать что бы было понятно что это с процентами работаем
 */
function executeOperation(operandOne, operator, operandTwo) {
  if (operator === "-") {
    minusPercentageAmount(operandOne, operandTwo);
  }
  if (operator === "+") {
    plusPercentageAmount(operandOne, operandTwo);
  }
  if (operator === "x") {
    multiplyPercentageAmount(operandOne, operandTwo);
  }
  if (operator === "/") {
    dividePercentageAmount(operandOne, operandTwo);
  }
}

/**
 * Отнимать процент.
 * @returns {Number}
 */
function minusPercentageAmount(baseValue, percentValue) {
  return baseValue - (baseValue / 100) * percentValue;
}

/**
 * Складывать процент.
 * @returns {Number}
 */
function plusPercentageAmount(baseValue, percentValue) {
  return (baseValue / 100) * percentValue + baseValue;
}

/**
 * Умножать процент.
 * @returns {Number}
 */
function multiplyPercentageAmount(baseValue, percentValue) {
  return (baseValue / 100) * percentValue * baseValue;
}

/**
 * Делить процент.
 * @returns {Number}
 */
function dividePercentageAmount(baseValue, percentValue) {
  return baseValue / ((baseValue / 100) * percentValue);
}

/*
баги, которые нашел: 

прописать правила работы с процентом. что надо брать только два числа

переделать процент.

подумать на проверку перед отправкой в (Пример - 1 - 1). при нажатии на кнопки результат сделать проверку 
котрая преобразует калькулейтитдата, если оператор мину его надо заменить на плюс. 

отображение на дисплее скоректировать, что бы большое количество символов  
было внутри рамок дисплея

подумать надо ли выводить подсчет сразу при нажатии на оператора или оставить 
все только в фурнкции результата

при нажатии на минус перед числом, все ломается. надо сделать что бы если 0 индекс это -, 
то число делать отрицательным

автофокусировоание на дисплее
*/
