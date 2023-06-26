const showOnDisplay = document.querySelector('.display');

function addCharToDisplay(n) {
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
        const indexPercentage = showOnDisplay.innerHTML.indexOf("%");
        const baseValue = Number(showOnDisplay.innerHTML.substring(0, indexPercentage));
        const percentValue = Number(showOnDisplay.innerHTML.substring(indexPercentage +1));

        showOnDisplay.innerHTML = eval((baseValue /100) * percentValue);
    } else {
        showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
    }
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
};