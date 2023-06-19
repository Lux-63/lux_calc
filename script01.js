let showOnDisplay = document.querySelector('.display');

function addCheck(n) {
    showOnDisplay.innerHTML += n;
};


function reset() {
    showOnDisplay.innerHTML = '';
};

function getResult() {
    showOnDisplay.innerHTML = eval(showOnDisplay.innerHTML);
};

function removeLastCharacter() {
    showOnDisplay.innerHTML = showOnDisplay.innerHTML.slice(0, -1);
};