// Basic operations
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
    return a / b;
}

// Operate function
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*': 
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

// Only gets rid of current display
function clearDisplay() {
    document.getElementById('screen-bottom').innerHTML = '';
    currentValue.length = 0;
}

// Deep clean
function clearAll() {
    document.getElementById('screen-bottom').innerHTML = '';
    document.getElementById('screen-top').innerHTML = '';
    currentValue.length = 0;
    firstValue = 0;
    secondValue = 0;
    operator = null;
    resultDone = false;
    topDisplay.length = 0;
}

// Backspace
function deleteChar() {
    currentValue.pop();
    document.getElementById('screen-bottom').innerHTML = currentValue.join('');
}


// Calc operation
let firstValue = 0;
let secondValue = 0;
let currentValue = [];
let operator = null;
let resultDone = false;
let topDisplay = [];

function display(clicked) {
    if (currentValue.length > 7) {
        alert('Can\'t enter more than 8 digits');
    }
    else if (clicked == '+' || clicked == '-' || clicked == '*' || clicked == '/') {
        // Check if more than one operation
        if (firstValue != 0) {
            secondValue = currentValue.join('');
            firstValue = operate(operator, Number(firstValue), Number(secondValue));
            operator = clicked;
            topDisplay.push(' ', operator, ' ');
            document.getElementById('screen-top').innerHTML = topDisplay.join('');
            clearDisplay();
        }
        else if (firstValue == 0) {
        operator = clicked;
        firstValue = currentValue.join('');
        topDisplay.push(' ', operator, ' ');
        document.getElementById('screen-top').innerHTML = topDisplay.join('');
        clearDisplay();
        }

    }

    else if (clicked == '=') {
        // Can't divide by 0
        if (resultDone == false && currentValue.join('') == 0 && operator == '/') {
            alert('Can\'t divide by 0!');
            clearAll();
        }

        else if (resultDone == false) {
            resultDone = true;
            secondValue = currentValue.join('');
            document.getElementById('screen-top').innerHTML = topDisplay.join('');
            clearDisplay();
            document.getElementById('screen-bottom').innerHTML = Math.round((operate(operator, Number(firstValue), Number(secondValue) + Number.EPSILON)) * 100000) / 100000;
        }
        // Stop weirdness if '=' is pressed repeatedly
        else {
            document.getElementById('screen-bottom').innerHTML = Math.round((operate(operator, Number(firstValue), Number(secondValue) + Number.EPSILON)) * 100000) / 100000;
        }

    }

    else if (clicked == '0' || '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9' ) {
        topDisplay.push(clicked);
        currentValue.push(clicked);
        document.getElementById('screen-bottom').innerHTML = currentValue.join('');
    }
    
}







