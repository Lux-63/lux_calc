const showOnDisplay = document.querySelector('.display');

function addValueAndCheckForDuplicateOperands(n) {
    const specialChars = '/*-+%.';
    const lastChar = showOnDisplay.innerHTML[showOnDisplay.innerHTML.length -1];
    const firstOperatorCharacter = specialChars.includes(lastChar);
    const secondOperatorCharacter = specialChars.includes(n);

    //console.log(firstOperatorCharacter, secondOperatorCharacter, replacingOneCharacterWithAnother, n)
    if (firstOperatorCharacter === true && secondOperatorCharacter === true) {
        showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1) + n;;
    } else {
        showOnDisplay.innerHTML += n;
    }
};


function clearInputField() {
    showOnDisplay.innerHTML = '';
};

function getResult() {

    //результат и вычисление процента
    const checkForPercentage = showOnDisplay.innerHTML.includes('%')

    //console.log(checkForPercentage)
    if (checkForPercentage == true) {    
        const numberAndPercentage = showOnDisplay.innerHTML.indexOf("%");
        const gettingTheValueOfTheAmount = showOnDisplay.innerHTML.substring(0, numberAndPercentage);
        const getPercentageValue = showOnDisplay.innerHTML.substring(numberAndPercentage +1);

        showOnDisplay.innerHTML = eval((gettingTheValueOfTheAmount /100) * getPercentageValue);
    } else {
        showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
    }
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
};