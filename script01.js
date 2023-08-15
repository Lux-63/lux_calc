const showOnDisplay = document.querySelector('.display');
const specialChars = '/*-+%.';
const numberEntry ='1234567890'
let calculateData = [];

function addCharToDisplay(n) {
        //замена оператора на новый нажатый оператор
        const isLastChar = showOnDisplay.innerHTML[showOnDisplay.innerHTML.length -1];
    
        const penultimateOperatorCharacter = specialChars.includes(isLastChar); 
        const currentOperatorCharacter = specialChars.includes(n);   
        //const penultimateNumberCharacter = numberEntry.includes(lastChar);
        //const currentNumberCharacter = numberEntry.includes(n);
        //console.log(firstOperatorCharacter, secondOperatorCharacter, replacingOneCharacterWithAnother, n)
        if (penultimateOperatorCharacter === false && currentOperatorCharacter === false){
            //showOnDisplay.innerHTML += n;
            calculateData.push (n);
        }
        if (penultimateOperatorCharacter === false && currentOperatorCharacter === true){
            //showOnDisplay.innerHTML += n
            calculateData.pop(showOnDisplay.innerHTML.slice(0, -1));
            calculateData.push(showOnDisplay.innerHTML.slice(-1));
        }
        
        if (penultimateOperatorCharacter === true && currentOperatorCharacter === true) {
            showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1) + n;
            calculateData.push(showOnDisplay.innerHTML.slice(0, -1));
        } 
    
        if (penultimateOperatorCharacter === true && currentOperatorCharacter === false) {
            calculateData.push(n);
        } else {
            showOnDisplay.innerHTML += n;
            calculateData.push (showOnDisplay.innerHTML);
        };   
        console.log(n, calculateData);
    };

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
    const checkForPercentage = showOnDisplay.innerHTML.includes('%')

    //console.log(checkForPercentage)
    if (checkForPercentage == true) {    
        showOnDisplay.innerHTML = percentageAmount();
    } else {
        showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
        calculateData = showOnDisplay.innerHTML;   
    }
    console.log(calculateData);
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
    calculateData = calculateData.slice(0, -1);
    console.log(calculateData);
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