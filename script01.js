const showOnDisplay = document.querySelector('.display');
const specialChars = '/*-+%.';
const numberEntry ='1234567890'
let calculateData = [];

function addCharToDisplay(currentChar) {
        //замена оператора на новый нажатый оператор
        const lastChar = calculateData[calculateData.length -1];
        const isLastCharSpecial = specialChars.includes(lastChar); 
        const isCurrentCharSpecial = specialChars.includes(currentChar);
        
        if (isLastCharSpecial === false && isCurrentCharSpecial === false){
            if (lastChar === undefined) {
                calculateData.push(Number(currentChar));
                console.log(calculateData);
            } else {
                const strChars = String(lastChar) + String(currentChar)
                console.log(strChars);

                calculateData[calculateData.length -1] = Number(strChars);
            
            }
        } else if (isLastCharSpecial === false && isCurrentCharSpecial === true){
            calculateData.push(currentChar);

        } else if (isLastCharSpecial === true && isCurrentCharSpecial === true) {
            calculateData.splice(-1, 1, currentChar)

        } else if (isLastCharSpecial === true && isCurrentCharSpecial === false) {
            calculateData.push(currentChar);
        };
        console.log(currentChar, calculateData);
        showOnDisplayChars();
    };

function showOnDisplayChars () {
    //вывод на дисплей массива в виде строки... 
    for (let i =0; i < calculateData.length; i++){
        if (i === 0) {
            result = calculateData;
        }
    showOnDisplay.innerHTML = result.join('');
    }

    
    /*let i = 0;
    let res = ''
    while (calculateData.length >i) {
        
        i++
    }
    showOnDisplay.innerHTML = res;*/
}

/*function separationObjects(n) {
    i = addCharToDisplay;
    const lastChar = showOnDisplay.innerHTML[showOnDisplay.innerHTML.length -1];
    const firstOperatorCharacter = specialChars.includes(lastChar); 
    const secondOperatorCharacter = specialChars.includes(i);
        if (firstOperatorCharacter === true && secondOperatorCharacter === true) {
            
        calculateData = showOnDisplay.innerHTML.slice(0, -1) + i;
        } else {
            calculateData += i;
        }
        console.log(calculateData);
};*/



function clearInputField() {
    showOnDisplay.innerHTML = '';
    calculateData = [];
    console.log(calculateData);
};

function getResult() {

    //результат и вычисление процента
    const checkForPercentage = calculateData.includes('%')

    //console.log(checkForPercentage)
    if (checkForPercentage == true) {    
        percentageAmount();
    } else {
                if (calculateData.length == 1) {
            showOnDisplay.innerHTML = calculateData[0];
        };
        for (let i = 0; i < calculateData.length; i++) {
            if (specialChars.includes(calculateData[i]) === true) {
                defineOperator(calculateData[i-1], calculateData[i], calculateData[i+1])
            };
        };
    };  
    console.log(calculateData);
};

function defineOperator (operandOne, operator, operandTwo) {
    if (operator == '+') {
        resultPlus(operandOne, operator, operandTwo);
    } else if (operator == '-') {
        resultMinus(operandOne, operator, operandTwo);
    } else if (operator == '/') {
        resultDivide (operandOne, operator, operandTwo);
    }  else if (operator == '*') {
        resultMultiply (operandOne, operator, operandTwo);
    };
};

function resultPlus (operandOne, operator, operandTwo) { // сложение
    calculateData.splice(0, 3, operandOne + operandTwo)
    getResult();
};
function resultMinus (operandOne, operator, operandTwo) { // вычитание
    calculateData.splice(0, 3, operandOne - operandTwo)
    getResult();
};
function resultMultiply (operandOne, operator, operandTwo) { // умножение
    calculateData.splice(0, 3, operandOne * operandTwo)
    getResult();
};
function resultDivide (operandOne, operator, operandTwo) { // деление
    calculateData.splice(0, 3, operandOne / operandTwo)
    getResult();
};


//удалять последний символ
function removeLastCharacter() {
    let lastValue = calculateData.splice(-1).toString();
    console.log(lastValue, lastValue.length, calculateData);

    if (lastValue.length > 1) {
        lastValue = lastValue.slice(0, lastValue.length -1)
        calculateData.push(+ lastValue);
        console.log(lastValue, calculateData);
        showOnDisplayChars();
    } else {
        console.log(calculateData);
        showOnDisplayChars();
    };
};


//код с процентом, проверка что делать с процентом (- + / *)
function percentageAmount(n){
    if (showOnDisplay.innerHTML.includes('-') === true) {
        return minusPercentageAmount(n);
    } 
    if (showOnDisplay.innerHTML.includes('+') === true) {
        return plusPercentageAmount(n);
    }
    if (showOnDisplay.innerHTML.includes('*') === true) {
        return multiplyPercentageAmount(n);
    }
    if (showOnDisplay.innerHTML.includes('/') === true) {
        return dividePercentageAmount(n);
    }
    };
    
function minusPercentageAmount(n){
    //отнимать процент
    const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
    const firstOperatorCharacter = deleteChars.includes('-');
    const indexPercentage = deleteChars.indexOf('-');
    const baseValue = Number(deleteChars.substring(0, indexPercentage));
    const percentValue = Number(deleteChars.substring(indexPercentage +1));
    //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
    
    if (firstOperatorCharacter === true) {        
    return eval(baseValue - (baseValue /100) * percentValue);
    }
};
function plusPercentageAmount(n){
    //складывать процент
    const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
    const firstOperatorCharacter = showOnDisplay.innerHTML.includes('+');
    const indexPercentage = showOnDisplay.innerHTML.indexOf('+');
    const baseValue = Number(deleteChars.substring(0, indexPercentage));
    const percentValue = Number(deleteChars.substring(indexPercentage +1));

    //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
    if (firstOperatorCharacter === true) {            
        return eval(((baseValue /100) * percentValue) + baseValue);
    }
    };
function multiplyPercentageAmount(n){
    //умножать процент
    const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
    const firstOperatorCharacter = showOnDisplay.innerHTML.includes('*');
    const indexPercentage = showOnDisplay.innerHTML.indexOf('*');
    const baseValue = Number(deleteChars.substring(0, indexPercentage));
    const percentValue = Number(deleteChars.substring(indexPercentage +1));

    //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
    if (firstOperatorCharacter === true) {            
        return eval(((baseValue /100) * percentValue) * baseValue);
    }
};
function dividePercentageAmount(n){
    //делить процент
    const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
    const firstOperatorCharacter = showOnDisplay.innerHTML.includes('/');
    const indexPercentage = showOnDisplay.innerHTML.indexOf('/');
    const baseValue = Number(deleteChars.substring(0, indexPercentage));
    const percentValue = Number(deleteChars.substring(indexPercentage +1));

    //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
    if (firstOperatorCharacter === true) {            
        return eval(baseValue / ((baseValue /100) * percentValue));
    }
};

/*баги, которые нашел: 

если введен только один символ и его удалить с помощью backspace, то этот сивол удаляется
только в массиве, а в дисплее он остается

переделать процент

избавиться от eval

отображение на дисплее скоректировать, что бы большое количество символов  
было внутри рамок дисплея

подумать надо ли выводить подсчет сразу при нажатии на оператора или оставить 
все только в фурнкции результата
*/