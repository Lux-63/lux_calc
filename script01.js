function cal(n) {
    display.innerHTML += n;
};

function reset() {
    display.innerHTML = '';
};
function getResult() {
    display.textContent = cal() * 1;
};