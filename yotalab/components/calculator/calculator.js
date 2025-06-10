export default function initializeCalculator(container) {
    let currentValue = '0';
    let previousValue = null;
    let operation = null;
    let shouldResetDisplay = false;

    const resultDisplay = container.querySelector('#result');

    function updateDisplay() {
        resultDisplay.textContent = currentValue;
    }

    function handleDigit(digit) {
        if (shouldResetDisplay) {
            currentValue = digit;
            shouldResetDisplay = false;
        } else {
            currentValue = currentValue === '0' ? digit : currentValue + digit;
        }
        updateDisplay();
    }

    function handleOperation(op) {
        if (previousValue === null) {
            previousValue = parseFloat(currentValue);
        } else if (operation) {
            const result = calculate(previousValue, parseFloat(currentValue), operation);
            previousValue = result;
            currentValue = result.toString();
            updateDisplay();
        }
        operation = op;
        shouldResetDisplay = true;
    }

    function calculate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '−': return a - b;
            case '×': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return b;
        }
    }

    function handleEqual() {
        if (operation && previousValue !== null) {
            const result = calculate(previousValue, parseFloat(currentValue), operation);
            currentValue = result.toString();
            previousValue = null;
            operation = null;
            updateDisplay();
        }
    }

    function handleClear() {
        currentValue = '0';
        previousValue = null;
        operation = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function handleSign() {
        currentValue = (parseFloat(currentValue) * -1).toString();
        updateDisplay();
    }

    function handlePercent() {
        currentValue = (parseFloat(currentValue) / 100).toString();
        updateDisplay();
    }

    // Add event listeners
    container.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.textContent;
            handleDigit(digit);
        });
    });

    container.querySelector('#btn_op_plus').addEventListener('click', () => handleOperation('+'));
    container.querySelector('#btn_op_minus').addEventListener('click', () => handleOperation('−'));
    container.querySelector('#btn_op_mult').addEventListener('click', () => handleOperation('×'));
    container.querySelector('#btn_op_div').addEventListener('click', () => handleOperation('/'));
    container.querySelector('#btn_op_equal').addEventListener('click', handleEqual);
    container.querySelector('#btn_op_clear').addEventListener('click', handleClear);
    container.querySelector('#btn_op_sign').addEventListener('click', handleSign);
    container.querySelector('#btn_op_percent').addEventListener('click', handlePercent);
    container.querySelector('#btn_digit_dot').addEventListener('click', () => {
        if (!currentValue.includes('.')) {
            currentValue += '.';
            updateDisplay();
        }
    });
} 