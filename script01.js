let i = document.querySelector('.display');
function cal(n) {
   i.innerHTML += n;
};


function reset() {
    i.innerHTML = '';
};

function getRes() {
    i.innerHTML = eval(i.innerHTML);
};