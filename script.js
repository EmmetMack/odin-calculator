//Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
// add
// subtract
// multiply
// divide

function add(a, b) {
    return a + b;
}

function subtract(a, b) { 
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b ;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

let display_val = "";
let a = ''; 
let operand = '';  
let b = ''; 


function updateDisplay() {
    display_val += this.value;
    const dis = document.querySelector('.display');
    dis.textContent = display_val;
}

let number_buttons = document.querySelectorAll(".number").forEach(button => button.addEventListener('click', updateDisplay));

//store first number  before the operator, then save the operator, then store the second num after operator, then call operate when equal sign pressed

let equal = document.querySelector('.button-equal');
equal.addEventListener('click', enterOperation);

function enterOperation() {
    let index = display_val.indexOf(operand);
    b = display_val.slice(index + 1, display_val.length);
    console.log("a", a);
    console.log('b', b);
    console.log('operator', operand);
    const dis = document.querySelector(".display");
    let result = operate(operand, Number(a), Number(b));
    dis.textContent = result;
}



function clickOperator() {
    a = display_val;
    display_val += this.value;
    operand = this.value;
    const dis = document.querySelector(".display");
    dis.textContent = display_val;
}

let operators = document.querySelectorAll(".operator");
operators.forEach(operatorButton => operatorButton.addEventListener('click', clickOperator));