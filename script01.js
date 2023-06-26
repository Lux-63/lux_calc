let showOnDisplay = document.querySelector('.display');

function addValueAndCheckForDuplicateOperands(n) {
    let specialChars = '/*-+%.';
    let lastChar = showOnDisplay.innerHTML[showOnDisplay.innerHTML.length -1];
    let firstOperatorCharacter = specialChars.includes(lastChar);
    let secondOperatorCharacter = specialChars.includes(n);
    let replacingOneCharacterWithAnother = showOnDisplay.innerHTML.slice(0, -1) + n;

    //console.log(firstOperatorCharacter, secondOperatorCharacter, replacingOneCharacterWithAnother, n)
    if (firstOperatorCharacter === true && secondOperatorCharacter === true) {
        showOnDisplay.innerHTML = replacingOneCharacterWithAnother;
    } else {
        showOnDisplay.innerHTML += n;
    }
};


function clearInputField() {
    showOnDisplay.innerHTML = '';
};

function checkingThePercentageAndGettingTheResult() {

    //результат и вычисление процента
    let checkForPercentage = showOnDisplay.innerHTML.includes('%')
    let gettingTheValueOfTheAmount = showOnDisplay.innerHTML.substring(0, showOnDisplay.innerHTML.indexOf("%"));
    let getPercentageValue = showOnDisplay.innerHTML.substring(showOnDisplay.innerHTML.indexOf("%") +1);

    //console.log(checkForPercentage)
    if (checkForPercentage == true) {     
        showOnDisplay.innerHTML = eval((gettingTheValueOfTheAmount /100) * getPercentageValue);
    } else {
        showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
    }
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
};