import { Page } from '../page.js';
import { Header } from '../../components/header/index.js';
import { Calculator } from '../../components/calculator/index.js';
import { initTheme } from '../../utils/theme.js';
import calculatorLogic from './calculator.js';

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
                        <div id="calculator-container"></div>
                    </div>
                </div>
            </div>
        `;

        // Add header
        this.header = new Header();
        const headerContainer = this.el.querySelector('#header-container');
        if (headerContainer) headerContainer.appendChild(this.header.render());

        // Add calculator
        const calculator = new Calculator();
        const calculatorContainer = this.el.querySelector('#calculator-container');
        if (calculatorContainer) calculatorContainer.appendChild(calculator.render());

        // Initialize theme
        initTheme();

        return this.el;
    }
}

export class Calculator {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = 'calculator-container';
    }

    render() {
        this.el.innerHTML = `
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
        `;

        // Initialize calculator logic
        calculatorLogic(this.el);

        // Initialize theme
        initTheme();

        return this.el;
    }
} 