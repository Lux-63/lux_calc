let showOnDisplay = document.querySelector('.display');

function addCheck(n) {
    let searchSimbol = '/*-+%.';
    let operatorOne = searchSimbol.includes(showOnDisplay.innerHTML[showOnDisplay.innerHTML.length -1]);
    let operatorTwo = searchSimbol.includes(n);
    let characterReplacement = showOnDisplay.innerHTML.slice(0, -1) + n;

    
    console.log(operatorOne, operatorTwo, characterReplacement,n)

        if (operatorOne == true && operatorTwo == true) {
            showOnDisplay.innerHTML = characterReplacement;
        }

        else {
            showOnDisplay.innerHTML += n;
        }
};


function reset() {
    showOnDisplay.innerHTML = '';
};

function getResult() {
    /*необходимо делать проверку символа % в случае соответствия переправлять на функцию процента
    if (showOnDisplay.length[penult] == '%') {
        showOnDisplay.innerHTML = eval(percentageOfTheAmount);

            showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
    };*/
    showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
};

