// If an operator is called, add current number to cache
// If cache size contains 2 values when an operator is called, perform operation, clear cache and assign result to first value


// Containers //
// Main
const calculator = document.querySelector('#calculator');

// Screen
const screen = document.createElement('div');
screen.classList.add('screen');

// Buttons Container Main
const mainButtonsContainer = document.createElement('div');
mainButtonsContainer.classList.add('mainButtonsContainer');

// Buttons Container Secondary
const secondaryButtonsContainer = document.createElement('div');
secondaryButtonsContainer.classList.add('secondaryButtonsContainer');

// Buttons
const mainButtons = [
    {
        "btn" : 7,
        "type": "number"
    },
    {
        "btn" : 8,
        "type": "number"
    },
    {
        "btn" : 9,
        "type": "number"
    },
    {
        "btn" : "÷",
        "type": "divide"
    },
    {
        "btn" : 4,
        "type": "number"
    },
    {
        "btn" : 5,
        "type": "number"
    },
    {
        "btn" : 6,
        "type": "number"
    },
    {
        "btn" : "x",
        "type": "multiply"
        
    },
    {
        "btn" : 1,
        "type": "number"
    },
    {
        "btn" : 2,
        "type": "number"
    },
    {
        "btn" : 3,
        "type": "number"
    },
    {
        "btn" : "-",
        "type": "subtract"
    },
    {
        "btn" : ".",
        "type": "dot"
    },
    {
        "btn" : 0,
        "type": "number"
    },
    {
        "btn" : "=",
        "type": "equals"
    },
    {
        "btn" : "+",
        "type": "add"
    }
];

const secondaryButtons = [];




// Append containers to eachother
calculator.appendChild(screen);
calculator.appendChild(mainButtonsContainer);





// Tracking Values
let bFirstNumber = true;
let bOperatorActive = false;
let bDecimal = false;
let bScreenHasValue = false;
let bCanEquate = false;

let currentNumbers = [];
let operation = {};

// Functions

function add(num1, num2) {
    operation.result = Math.round(num1 + num2);
    operation.num1 = operation.result;
    return operation.result;
}

function subtract (num1, num2) {
    operation.result = Math.round(num1 - num2);
    operation.num1 = operation.result;
    return operation.result
}

function multiply (num1, num2) {
    operation.result = Math.round(num1 * num2);
    operation.num1 = operation.result;
    return operation.result;
}

function divide (num1, num2) {
    operation.result = Math.round(num1 / num2);
    operation.num1 = operation.result;
    return operation.result;
}



function evaluate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            console.log(add(num1, num2));
            break;
        
        case 'subtract':
            console.log(subtract(num1, num2));
            break;

        case 'multiply':
            console.log(multiply(num1, num2));
            break;

        case 'divide':
            console.log(divide(num1, num2));
            break;
    }
};

function displayOperator(operator) {
    screen.innerText = operator;
}

function updateOperation(operator, currentNum) {
    bOperatorActive = true;
    if (!('operator') in operation) {
        operation.operator = operator;
    }
    if (!('num1' in operation)) {
        operation.num1 = currentNum;
    } else {
        operation.num2 = currentNum;
    }

    if (operation.num1 && operation.num2) {
        bCanEquate = true;
        evaluate(operation.operator, operation.num1, operation.num2);
    }
    bDecimal = false;
    operation.operator = operator;
}

function updateDisplay(e) {

    switch (e.target.classList[0]) {
        case 'number':
            if (bOperatorActive) {
                bOperatorActive = false;
                screen.innerText = e.target.innerText;
                break;
            } else {
                screen.innerText += e.target.innerText;
                break;
            }

        case 'add':
            updateOperation('add', +screen.innerText);
            if ('result' in operation){
                screen.innerText = operation.num1;
            } else {
                displayOperator("+");
            }
            break;
        
        case 'subtract':
            updateOperation('subtract', +screen.innerText);
            displayOperator("-");

            break;

        case 'multiply':
            updateOperation('multiply', +screen.innerText);
            displayOperator("x");

            break;

        case 'divide':
            updateOperation('divide', +screen.innerText);
            displayOperator("÷");

            break;

        case 'equals':
            updateOperation('equals', +screen.innerText);
            if ('result' in operation){
                screen.innerText = operation.num1;
            }

            break;
        case 'dot':
            if (!bDecimal) {
                screen.innerText += e.target.innerText;
                bDecimal = true;
            }
            break;

        }
    //console.log(screen.innerText.length)
    //screen.innerText += e.target.innerText;
}

function makeRows(rows, cols) {
  // Set style attributes of grid rows and grid-cols, custom properties denoted by -- in CSS
    mainButtonsContainer.style.setProperty('--grid-rows', rows);
    mainButtonsContainer.style.setProperty('--grid-cols', cols);
    // Iterates as long as c is less than rows * cols (256) - stops at 255, 0-based
    for (c = 0; c < (rows * cols); c++) {
      // Create a div element called cell
      let cell = document.createElement("button");
      cell.innerText = mainButtons[c].btn;
      cell.classList.add(mainButtons[c].type);
      cell.classList.add("button");


      switch (mainButtons[c].type) {
        case 'number':
            cell.addEventListener('mousedown', updateDisplay);
            break;

        case 'add':
            cell.addEventListener('mousedown', updateDisplay);
            break;
        
        case 'subtract':
            cell.addEventListener('mousedown', updateDisplay);

            break;

        case 'multiply':
            cell.addEventListener('mousedown', updateDisplay);

            break;

        case 'divide':
            cell.addEventListener('mousedown', updateDisplay);

            break;

        case 'equals':
            cell.addEventListener('mousedown', updateDisplay);

            break;


        case 'dot':
            cell.addEventListener('mousedown', updateDisplay);

            break;
      }

    //   if (mainButtons[c].type == "number") {
    //     cell.addEventListener('mousedown', updateDisplay);
    //     }
    //   if (mainButtons[c].type == "")

      mainButtonsContainer.appendChild(cell);
  
    };
  };

  makeRows(4, 4);
  