const showOnDisplay = document.querySelector('.display');

function addCharToDisplay(n) {
    //замена оператора на новый нажатый оператор
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
        showOnDisplay.innerHTML = percentageOfAmount();
    } else {
        showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
    }
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
};


//код с процентом, что бы можно было отнимать или складывать результаты (100-90%=10 или 100+90%=190)
function percentageOfAmount(n){
    if (showOnDisplay.innerHTML.includes('-') === true) {
        return minusPercentageOfAmount(n);
    } 
    if (showOnDisplay.innerHTML.includes('+') === true) {
        return plusPercentageOfAmount(n);
    }
    };
function minusPercentageOfAmount(n){
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
//надо сделать что бы работало в сложении
function plusPercentageOfAmount(n){
    const deleteChars = showOnDisplay.innerHTML.slice(0, -1);
    const firstOperatorCharacter = showOnDisplay.innerHTML.includes('+');
    const indexPercentage = showOnDisplay.innerHTML.indexOf('+');
    const baseValue = Number(deleteChars.substring(0, indexPercentage));
    const percentValue = Number(deleteChars.substring(indexPercentage +1));

    //console.log(firstOperatorCharacter, indexPercentage, baseValue, percentValue)
    if (firstOperatorCharacter === true) {            
        return eval((baseValue - (baseValue /100) * percentValue)+ baseValue);
    }
    };