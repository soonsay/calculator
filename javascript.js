// PROJECT PLAN

// To make it easier to control behavior, I am using containers for everything:
    // Calculator container to store everything
    // Display container to store the two displays (main and history) - may revise to just the mainDisplay which history display is appended to - flex column layout
    // Main buttons container to store the numbers/operators
        // I'm using an array of buttons to assign during Grid creation in the correct order. See makeRows function for more info.

    // Secondary buttons container to store the Clear & Delete buttons


// For functions, I require the core calculator functionality as well as handlers to receive & pass user input

    // Core Functionality:
        // Add, Subtract, Multiply, Divide, Equals - they will only ever receive two numbers and round the result
        // Evaluate - evaluates the result based on updateOperation
        // Update Display - passes selections to updateOperation & maintains the numbers/operator displayed on screen
            // Update History display - uses the values to keep track of and display current history

        // Update Operation - receives selections (operator, number) and updates values accordingly. If all values are available, pass to evaluate
    

// For variables, I need to keep track of what buttons are pressed, what type of buttons, and if an operator should fire on two numbers\

    // Variables:
    // bOperatorActive (bool designated by preceding b) = tracks if an operator has been pressed to control behavior for future buttons
    // bDecimal (bool) = tracks if a decimal has been pressed so no further decimals can be entered
    // bNumPressed = tracks if a number has been entered so we can't accidentally call an operator on nothing

    // operation (object) = contains the num1, num2, and operation values that are passed into updateOperation (and eventually evaluate)
    // history = contains the same as operation but only assigned at evaluation time rather than every time updateOperation is called - is modified less than operation so easier to work with/less timing dependent.
    // currentOp = contains the current operator so things don't get overwritten/calculator doesn't lag behind an operation if equals is used instead of consecutive operations.


// REVIEW
// So far, I need to re factor *a LOT*. I feel like my code is O.K. in spots & solutions are ok but syntax, consistency, and proper planning can be improved
// I've been able to reduce re-written code in some spots by adding logic to functions called in all cases (GOOD) but too much logic is still prevalent in the core functions
// If I revisit this project, I want to condense my function calls significantly and reduce the amount of arguments required at each layer. 
// I also want to condense my conditionals (especially in updateOperation!). There are lines of code effectively doing nothing.


// Containers //
// Main
const calculator = document.querySelector('#calculator');

// Screen
const displayContainer = document.createElement('div');
displayContainer.classList.add('displayContainer');

const mainDisplay = document.createElement('div');
mainDisplay.classList.add('mainDisplay');

const historyDisplay = document.createElement('div');
historyDisplay.classList.add('historyDisplay');

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
displayContainer.appendChild(mainDisplay);
displayContainer.appendChild(historyDisplay);

calculator.appendChild(displayContainer);
calculator.appendChild(mainButtonsContainer);





// Tracking Values
let bOperatorActive = false;
let bDecimal = false;
let bNumPressed = false;

let operation = {};
let history = "";
let currentOp;

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
    let result;
    switch (operator) {
        case 'add':
            result = add(num1, num2);
            history = num1 + ' + ' + num2 + ' = ' + result;
            break;
        
        case 'subtract':
            result = subtract(num1, num2);
            history = num1 + ' - ' + num2 + ' = ' + result;
            break;

        case 'multiply':
            result = multiply(num1, num2);
            history = num1 + ' x ' + num2 + ' = ' + result;
            break;

        case 'divide':
            if (num1 == 0 && num2 == 0) {
                console.log("wtf");
                operation.result = "Error";
                history = operation.result;
                break;
            }
            if (num1 == 0) {
                operation.result = 0;
                history = 0;
                break;
            }
            if (num2 == 0) {
                operation.result = "Infinity";
                history = operation.result;
                break;
            }

            result = divide(num1, num2);
            history = num1 + ' / ' + num2 + ' = ' + result;
            break;
    }
};

function updateOperation(operator, currentNum) { 
    console.log(operator);
    bOperatorActive = true;

    if (isNaN(currentNum)) {
        operation.operator = currentOp;
        updateHistory(operator, operation.num1);
        return;
    }

    if (!bOperatorActive) {
        operation.operator = operator;
        bOperatorActive = true;
    }

    if (!('num1' in operation)) { // If num1 doesnt exist, create and assign
        operation.num1 = currentNum;
    } else {
        operation.num2 = currentNum; // If num1 has been assigned, the num that was passed in is assigned to num2. Num1 effectively function as an accumulator in this setup.
    }

    if ((operation.hasOwnProperty("num1" && "num2"))) { // If both numbers have been assigned, evaluate with the current operator & nums.

        if (operation.operator == ('multiply' || 'divide') && (!bNumPressed)) {
            operation.operator = currentOp;
            bDecimal = false;
            console.log("return");
            return;
        } 
        console.log(operation.operator, operation.num1, operation.num2);
        evaluate(operation.operator, operation.num1, operation.num2);

    }
    if (operator != 'equals' || operator == 'equals') {
        bDecimal = false
        operation.operator = currentOp;
        return;
    }
    // Set decimal to false so the calc accepts decimal inputs again on the new number.
    // Assign the current operator  AFTER everything else, to make sure the previous operator fires before reassignment so concurrent operations are supported without pressing equals. 
    // This is the most important step to capture calculator behavior.

}




function updateDisplay(e) {
    let operator;
    switch (e.target.classList[0]) {

        case 'number':
            bNumPressed = true;
            if (bOperatorActive) {   // Checks to see if an operator is active so we know to replace the screen text with the second number
                bOperatorActive = false;
                if (bDecimal) {
                    mainDisplay.innerText += e.target.innerText;
                    break;
                } else {
                    mainDisplay.innerText = e.target.innerText; // Replace screen text with assignment operator
                    break;
                }
            
            } else {
                mainDisplay.innerText += e.target.innerText;
                break;
            }

        case 'add':
            currentOp = "add"
            operator = "+"
            value = +mainDisplay.innerText;
            clearMainDisplay();
            updateOperation('add', value);
            updateHistory(operator, operation.num1);
            bNumPressed = false;

            break;

        
        case 'subtract':
            currentOp = "subtract";
            operator = "-"
            value = +mainDisplay.innerText;
            clearMainDisplay();
            updateOperation('subtract', value);
            updateHistory(operator, operation.num1);
            bNumPressed = false;

            break;

        case 'multiply':
            currentOp = "multiply";
            operator = "x";
            value = +mainDisplay.innerText;
            clearMainDisplay();
            updateOperation('multiply', value);
            updateHistory(operator, operation.num1);
            bNumPressed = false;

            break;

        case 'divide':
            currentOp = "divide";
            operator = "÷"
            value = +mainDisplay.innerText;
            clearMainDisplay();
            updateOperation('divide', value);
            updateHistory(operator, operation.num1);
            bNumPressed = false;

            break;

        case 'equals':
            operator = "="
            value = +mainDisplay.innerText;
            if (isNaN(value)) {
                break;
            }
            updateOperation(currentOp, value);
            updateHistory(operator, operation.num1);
            clearMainDisplay();
            bNumPressed = false;

            break;

        case 'dot':
            if (!bDecimal || mainDisplay.innerText == '') {
                mainDisplay.innerText += e.target.innerText;
                bDecimal = true;
            }
            break;

        }
}

function updateHistory(operator, currentNum) {
    if (bNumPressed) {
        if (operator == "=") {
            historyDisplay.innerText = history;
        } else {
            historyDisplay.innerText = history;
            mainDisplay.innerText = currentNum + ' ' + operator;
        }
    }
    else {
        mainDisplay.innerText = currentNum + ' ' + operator;
    }


}

function clearMainDisplay() {
    mainDisplay.innerText = "";
}

function updateValue() {
    if (bOperatorActive) {

    }
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
      mainButtonsContainer.appendChild(cell);
  
    };
  };

  makeRows(4, 4);
  