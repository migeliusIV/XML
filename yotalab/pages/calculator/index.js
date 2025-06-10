import { Page } from '../page.js';
import { Header } from '../../components/header/index.js';
import { initTheme } from '../../utils/theme.js';

export class CalculatorPage extends Page {
    constructor() {
        super();
        this.state = {
            // Add any state variables you need
        };
    }

    render() {
        console.log('Rendering calculator page...');
        this.el.innerHTML = `
            <div id="header-container"></div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-12">
                        <h1 class="mb-4">Калькулятор тарифов</h1>
                        <div class="calculator-container">
                            <div class="calc_border">
                                <div id="result" class="result">0</div>
                                <div class="engineer-panel" style="display:none; margin-bottom:10px;">
                                    <button class="my-btn eng-btn" data-func="square">x²</button>
                                    <button class="my-btn eng-btn" data-func="sqrt">√</button>
                                    <button class="my-btn eng-btn" data-func="fact">n!</button>
                                    <button class="my-btn eng-btn" data-func="back">⌫</button>
                                    <button class="my-btn eng-btn" data-func="sin">sin</button>
                                    <button class="my-btn eng-btn" data-func="cos">cos</button>
                                    <button class="my-btn eng-btn" data-func="tan">tan</button>
                                    <button class="my-btn eng-btn" data-func="ctg">ctg</button>
                                </div>

                                <div>
                                    <div>  
                                        <button id="btn_op_clear" class="my-btn secondary">C</button>
                                        <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                                        <button id="btn_op_percent" class="my-btn secondary">%</button>
                                        <button id="btn_op_div" class="my-btn primary">/</button>
                                    </div>

                                    <div>
                                        <button id="btn_digit_7" class="my-btn">7</button>
                                        <button id="btn_digit_8" class="my-btn">8</button>
                                        <button id="btn_digit_9" class="my-btn">9</button>
                                        <button id="btn_op_mult" class="my-btn primary">×</button>
                                    </div>

                                    <div>
                                        <button id="btn_digit_4" class="my-btn">4</button>
                                        <button id="btn_digit_5" class="my-btn">5</button>
                                        <button id="btn_digit_6" class="my-btn">6</button>
                                        <button id="btn_op_minus" class="my-btn primary">−</button>
                                    </div>

                                    <div>
                                        <button id="btn_digit_1" class="my-btn">1</button>
                                        <button id="btn_digit_2" class="my-btn">2</button>
                                        <button id="btn_digit_3" class="my-btn">3</button>
                                        <button id="btn_op_plus" class="my-btn primary">+</button>
                                    </div>

                                    <div>
                                        <button id="btn_digit_0" class="my-btn">0</button>
                                        <button id="btn_digit_dot" class="my-btn">.</button>
                                        <button id="btn_op_equal" class="my-btn primary execute">=</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add header
        this.header = new Header();
        const headerContainer = this.el.querySelector('#header-container');
        if (headerContainer) headerContainer.appendChild(this.header.render());

        // Initialize calculator
        this.initializeCalculator();

        // Initialize theme
        initTheme();

        return this.el;
    }

    initializeCalculator() {
        let currentValue = '0';
        let previousValue = null;
        let operation = null;
        let shouldResetDisplay = false;

        const resultDisplay = this.el.querySelector('#result');

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
        this.el.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
            button.addEventListener('click', () => {
                const digit = button.textContent;
                handleDigit(digit);
            });
        });

        this.el.querySelector('#btn_op_plus').addEventListener('click', () => handleOperation('+'));
        this.el.querySelector('#btn_op_minus').addEventListener('click', () => handleOperation('−'));
        this.el.querySelector('#btn_op_mult').addEventListener('click', () => handleOperation('×'));
        this.el.querySelector('#btn_op_div').addEventListener('click', () => handleOperation('/'));
        this.el.querySelector('#btn_op_equal').addEventListener('click', handleEqual);
        this.el.querySelector('#btn_op_clear').addEventListener('click', handleClear);
        this.el.querySelector('#btn_op_sign').addEventListener('click', handleSign);
        this.el.querySelector('#btn_op_percent').addEventListener('click', handlePercent);
        this.el.querySelector('#btn_digit_dot').addEventListener('click', () => {
            if (!currentValue.includes('.')) {
                currentValue += '.';
                updateDisplay();
            }
        });
    }
} 