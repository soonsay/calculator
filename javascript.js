

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






// Append containers to eachother
calculator.appendChild(screen);
calculator.appendChild(mainButtonsContainer);




// Tracking Bools
let bFirstNumber = true;

// Functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}



function operate(operation, num1, num2) {
    switch (operation) {
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

function displayNumber(e) {
    console.log(e.target.innerText);
    screen.innerText += e.target.innerText;
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

      if (mainButtons[c].type == "number") {
        cell.addEventListener('mousedown', displayNumber);
    }
      // Add event listeners for mouse over and mouse down to simulate "dragging"
    //   cell.addEventListener('mouseover', drawColor);
    //   cell.addEventListener('mousedown', drawColor);

      mainButtonsContainer.appendChild(cell);
  
    };
  };

  makeRows(4, 4);
  