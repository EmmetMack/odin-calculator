//Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
// add
// subtract
// multiply
// divide

OPERATORS = ['/', '+', '-', '*'];

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
let expression = [];

//when the operator is pressed, find the number in front of it and add it to an array
//then when the equal sign is pressed, loop through the array, and calculate the expression from left to right, updating the display each time

//this function purely updates the display, no logic
function numberPressed() {
    console.log('prevOperator', prevOperator);
    if (prevOperator === '/' && this.value === '0') {
        alert("Silly goose you can't divide by zero!");
        return;
    } 
    display_val += this.value;
    const dis = document.querySelector('.display');
    dis.textContent = display_val;
    expression.push(this.value);
    if (expression.includes(OPERATORS[0]) || expression.includes(OPERATORS[1]) ||  expression.includes(OPERATORS[2]) || expression.includes(OPERATORS[3])) {
        document.querySelector('.button-equal').disabled = false;
    } else {
        document.querySelector('.button-equal').disabled = true;
    }
   
}

let number_buttons = document.querySelectorAll(".number").forEach(button => button.addEventListener('click', numberPressed));

let equal = document.querySelector('.button-equal');
equal.addEventListener('click', clickEquals);

function clickEquals() {
    //add check that there is an operator or not or something
   //now we have an array of individual numbers and opeators i.e ['2', '2', '-', '5', '+', '4']
   let a = "";
   let b = "";
   let operator = "";
   let operatorSeen = false;
   let tempExpression = expression;
   console.log('tempExpression: ', tempExpression);
   while ( tempExpression.includes(OPERATORS[0]) || tempExpression.includes(OPERATORS[1])||  tempExpression.includes(OPERATORS[2]) || tempExpression.includes(OPERATORS[3])) {
       let currDigit = tempExpression.shift();
       console.log('currDigit: ', currDigit);
       if (!OPERATORS.includes(currDigit) && !operatorSeen) {
            a += currDigit;
       } else if (!OPERATORS.includes(currDigit) && operatorSeen) {
           b += currDigit
       } else if (OPERATORS.includes(currDigit)&& !operatorSeen) {
            operator = currDigit;
            operatorSeen = true;
       } else {
            console.log('a: ', a);
            console.log('b: ', b);
            a = operate(operator, Number(a), Number(b));
            operator = currDigit;
            operatorSeen = true; //always adding to be from now on because a will just be populated with the math
            b = ""; 
            updateDisplayWithExpressionResult(a, tempExpression); //update the display string
            
       }
   }
   //run it again one last time with one number that's left in expression
   if (tempExpression.length > 0) {
        console.log('a: ', a);
        console.log('b: ', b);
        a = operate(operator, Number(a), Number(tempExpression.join('')));
        updateDisplayWithExpressionResult(a, []); //update the display string
   }
   //unshift from the beginning, 
   //loop through, have a current string and add numbers to it until we get an operator,
   // store the operator in a variable
   //then loop through until we find another operator
   //call operate with the stored a, b, and operator, then update display -- helper to update display
   //then set a to the result of operate(), 
   //find operator, store b as number before operator
   //repeat until array is empty
}

function updateDisplayWithExpressionResult(a, parsedExpression) {
    console.log('a in update', a);
    let intersection = expression.filter(x => parsedExpression.includes(x));
    console.log('intersection in updateDisplay', intersection);
    const dis = document.querySelector('.display');
    dis.textContent = a + intersection.join('');
}

let prevOperator = ""
function clickOperator() {
    display_val += this.value;
    prevOperator = this.value;
    const dis = document.querySelector(".display");
    dis.textContent = display_val;
    expression.push(this.value);
    document.querySelector('.button-equal').disabled = true;
}

let operators = document.querySelectorAll(".operator");
operators.forEach(operatorButton => operatorButton.addEventListener('click', clickOperator));

function clear() {
    display_val = "";
    const dis = document.querySelector('.display');
    dis.textContent = "Placeholder. Click buttons to begin populating with math";
    expression = [];
}

let clearButton = document.querySelector('.button-clear');
clearButton.addEventListener('click', clear);