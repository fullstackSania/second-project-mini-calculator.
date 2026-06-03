// Get display element
const display = document.getElementById("display");

// Variable to store current input
let currentInput = "";

// Function to append numbers
function appendNumber(number) {
    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Function to append operators
function appendOperator(operator) {
    if (currentInput === "" && operator === "-") {
        currentInput = "-";
        updateDisplay();
        return;
    }
    
    if (currentInput === "") return;
    
    const lastChar = currentInput[currentInput.length - 1];
    if (["+", "-", "*", "/"].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    updateDisplay();
}

// Function to clear display
function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

// Function to delete last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Function to calculate result
function calculate() {
    if (currentInput === "") return;
    
    try {
        // Replace × with * and ÷ with / for evaluation
        let expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            alert("Cannot divide by zero!");
            clearDisplay();
            return;
        }
        
        // Round to 10 decimal places to avoid floating point issues
        result = Math.round(result * 10000000000) / 10000000000;
        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        alert("Invalid Expression!");
        clearDisplay();
    }
}

// Function to update display
function updateDisplay() {
    if (currentInput === "") {
        display.value = "";
        display.placeholder = "0";
    } else {
        display.value = currentInput;
        display.placeholder = "";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;
    
    // Numbers (0-9)
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    }
    // Decimal point
    else if (key === ".") {
        appendNumber(".");
    }
    // Operators
    else if (key === "+") {
        appendOperator("+");
    }
    else if (key === "-") {
        appendOperator("-");
    }
    else if (key === "*") {
        appendOperator("*");
    }
    else if (key === "/") {
        appendOperator("/");
    }
    // Enter key for calculate
    else if (key === "Enter" || key === "=") {
        calculate();
    }
    // Escape key for clear
    else if (key === "Escape") {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === "Backspace") {
        deleteLast();
    }
});

// Add animation on button click (visual feedback)
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 100);
    });
});