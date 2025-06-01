import { initTheme, toggleTheme } from './utils/theme.js';

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function(event) {
    // Игнорируем повторные события зажатия клавиш
    if (event.repeat) return;
    
    // Определяем соответствующую кнопку
    let button = null;
    const key = event.key;
    
    // Сопоставление клавиш с кнопками
    switch(key) {
      case '0': button = document.getElementById('btn_digit_0'); break;
      case '1': button = document.getElementById('btn_digit_1'); break;
      case '2': button = document.getElementById('btn_digit_2'); break;
      case '3': button = document.getElementById('btn_digit_3'); break;
      case '4': button = document.getElementById('btn_digit_4'); break;
      case '5': button = document.getElementById('btn_digit_5'); break;
      case '6': button = document.getElementById('btn_digit_6'); break;
      case '7': button = document.getElementById('btn_digit_7'); break;
      case '8': button = document.getElementById('btn_digit_8'); break;
      case '9': button = document.getElementById('btn_digit_9'); break;
      case '.': button = document.getElementById('btn_digit_dot'); break;
      case '+': button = document.getElementById('btn_op_plus'); break;
      case '-': button = document.getElementById('btn_op_minus'); break;
      case '*': button = document.getElementById('btn_op_mult'); break;
      case '/': button = document.getElementById('btn_op_div'); break;
      case '%': button = document.getElementById('btn_op_percent'); break;
      case 'Enter': button = document.getElementById('btn_op_equal'); break;
      case '=': button = document.getElementById('btn_op_equal'); break;
      case 'Escape': button = document.getElementById('btn_op_clear'); break;
      case 'Backspace': button = document.querySelector('[data-func="back"]'); break;
    }
    
    // Если нашли соответствующую кнопку - имитируем клик
    if (button) {
      event.preventDefault(); // Предотвращаем стандартное действие браузера
      button.click();
      
      // Добавляем визуальный эффект нажатия
      button.classList.add('key-pressed');
      setTimeout(() => button.classList.remove('key-pressed'), 100);
    }
  })

  // Проверяем сохраненную тему при загрузке страницы
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
  }

  initTheme(); // Инициализируем тему при загрузке страницы калькулятора

  // --- Калькулятор с поддержкой длинных выражений ---
  const result = document.getElementById('result');
  let expression = '';
  let currentNumber = '';
  let justEvaluated = false;
  let dotLock = false;

  // Функция для форматирования числа
  function formatNumber(num) {
    if (typeof num !== 'number') return num; // Для строк типа 'Ошибка'
    
    // Преобразуем число в строку без экспоненты
    let numStr = num.toString();
    
    // Проверяем количество значащих цифр (исключая точку и знак минуса)
    const significantDigits = numStr.replace(/[^0-9]/g, '').length;
    
    // Если больше 9 значащих цифр или число очень маленькое/большое - используем экспоненциальную запись
    if (significantDigits > 9 || Math.abs(num) >= 1e11 || (Math.abs(num) > 0 && Math.abs(num) < 1e-6)){
      return num.toExponential(6).replace(/(\.\d*?[1-9])0+e/, '$1e').replace(/\.?0+e/, 'e');
    }
    
    // Для обычных чисел убираем лишние нули после точки
    if (numStr.includes('.')) {
      numStr = numStr.replace(/\.?0+$/, '').replace(/(\.\d*?)0+$/, '$1');
      if (numStr.endsWith('.')) numStr = numStr.slice(0, -1);
    }
    
    return numStr;
  }

function updateDisplay(val) {
    if (val === 'Ошибка') {
        result.textContent = val;
        result.style.color = '#ff0000'; // Красный для ошибок
        return;
    }
    
    let displayVal;
    try {
        // Пытаемся преобразовать в число
        const num = typeof val === 'string' ? parseFloat(val) : val;
        displayVal = formatNumber(num);
        
        // Определяем цвет на основе введенного числа
        if (typeof num === 'number') {
            // Преобразуем число в цветовой код
            let colorValue;
            if (num === 0) {
                colorValue = '#ffffff'; // Белый для нуля
            } else {
                // Нормализуем число к диапазону 0-16777215 (FFFFFF в HEX)
                const absNum = Math.abs(num);
                const logNum = Math.log10(absNum + 1); // Логарифмическая шкала для лучшего распределения
                const normalized = Math.min(logNum * 1000000, 16777215);
                const intColor = Math.floor(normalized);
                
                // Преобразуем в HEX
                colorValue = '#' + intColor.toString(16).padStart(6, '0');
            }
            
            result.style.color = colorValue;
        }
    } catch {
        displayVal = val;
        result.style.color = '#cccccc'; // Серый для нечисловых значений
    }
    
    // Ограничиваем максимальную длину вывода
    if (displayVal.length > 15) {
        displayVal = displayVal.substring(0, 15) + '...';
    }
    
    result.textContent = displayVal;
}

  // В функции safeEval нужно изменить возвращаемое значение:
  function safeEval(expr) {
    try {
      expr = expr.replace(/x/g, '*');
      if (/[^0-9+\-*/.() ]/.test(expr)) return 'Ошибка';
      // eslint-disable-next-line no-eval
      let res = eval(expr);
      if (typeof res === 'number' && isFinite(res)) {
        return res; // Возвращаем число, а не строку
      } else {
        return 'Ошибка';
      }
    } catch {
      return 'Ошибка';
    }
  }

  // Получаем все кнопки калькулятора
  const buttons = document.querySelectorAll('.my-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const value = btn.textContent.trim();
      if (btn.disabled) return;
      // Блокировка кнопок после точки
      if (dotLock && !(value >= '0' && value <= '9') && value !== 'C' && value !== '⌫') return;
      btn.disabled = true;
      setTimeout(() => { btn.disabled = false; }, 150);

      if (value >= '0' && value <= '9') {
        if (justEvaluated) {
          expression = '';
          currentNumber = '';
          justEvaluated = false;
        }
        currentNumber += value;
        expression += value;
        updateDisplay(currentNumber);
        dotLock = false;
      } else if (value === '.') {
        if (justEvaluated) {
          expression = '0.';
          currentNumber = '0.';
          justEvaluated = false;
        } else {
          let lastNum = currentNumber;
          if (!lastNum.includes('.')) {
            currentNumber += '.';
            expression += '.';
            dotLock = true;
          }
        }
        updateDisplay(currentNumber);
      } else if (["+", "-", "x", "/"].includes(value)) {
        if (expression === '' && value === '-') {
          expression = '-';
          currentNumber = '-';
          updateDisplay(currentNumber);
        } else if (expression !== '' && !/[+\-x/]$/.test(expression)) {
          expression += value;
          let temp = safeEval(expression.slice(0, -1));
          updateDisplay(temp);
          currentNumber = '';
        } else if (/[+\-x/]$/.test(expression)) {
          expression = expression.slice(0, -1) + value;
        }
        justEvaluated = false;
        dotLock = false;
      } else if (value === '=') {
        let res = safeEval(expression);
          updateDisplay(res); // Передаем число, а не строку
          expression = res.toString();
          currentNumber = res.toString();
          justEvaluated = true;
          dotLock = false;
      } else if (value === 'C') {
        expression = '';
        currentNumber = '';
        updateDisplay('0');
        justEvaluated = false;
        dotLock = false;
      } else if (value === '+/-') {
        if (currentNumber) {
          if (currentNumber.startsWith('-')) {
            currentNumber = currentNumber.slice(1);
          } else {
            currentNumber = '-' + currentNumber;
          }
          expression = expression.replace(/(\d*\.?\d+)$|(-\d*\.?\d+)$/, currentNumber);
          updateDisplay(currentNumber);
        }
        dotLock = false;
      } else if (value === '%') {
        if (currentNumber) {
          let percent = (parseFloat(currentNumber) / 100).toString();
          currentNumber = percent;
          expression = expression.replace(/(\d*\.?\d+)$|(-\d*\.?\d+)$/, percent);
          updateDisplay(currentNumber);
        }
        dotLock = false;
      }
    });
});

// Добавляем стиль для визуального эффекта нажатия клавиш
const style = document.createElement('style');
style.textContent = `
  .key-pressed {
    transform: scale(0.95);
    box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
    opacity: 0.9;
  }
`;

document.head.appendChild(style);
  // --- Переключение режимов калькулятора ---
  const engineerPanel = document.querySelector('.engineer-panel');
  const dropdown = document.querySelector('.dropdown-content');
  if (dropdown && engineerPanel) {
    dropdown.addEventListener('click', function(e) {
      if (e.target.textContent.includes('Инженерный')) {
        engineerPanel.style.display = '';
      } else if (e.target.textContent.includes('Обычный')) {
        engineerPanel.style.display = 'none';
      }
    });
  }

  // --- Инженерные функции ---
  function factorial(n) {
    n = Number(n);
    if (n < 0 || !Number.isInteger(n)) return 'Ошибка';
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  document.querySelectorAll('.eng-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const func = btn.dataset.func;
      if (dotLock && func !== 'back') return;
      let val = parseFloat(currentNumber || '0');
      let res = val;
      switch(func) {
        case 'square':
          res = val * val;
          break;
        case 'sqrt':
          res = val >= 0 ? Math.sqrt(val) : 'Ошибка';
          break;
        case 'fact':
          res = factorial(val);
          break;
        case 'back':
          if (currentNumber.length > 0) {
            currentNumber = currentNumber.slice(0, -1);
            expression = expression.slice(0, -1);
            updateDisplay(currentNumber || '0');
            if (!currentNumber.includes('.')) dotLock = false;
            return;
          }
          break;
        case 'sin':
          res = Math.sin(val * Math.PI / 180);
          break;
        case 'cos':
          res = Math.cos(val * Math.PI / 180);
          break;
        case 'tan':
          res = Math.tan(val * Math.PI / 180);
          break;
        case 'ctg':
          res = Math.tan(val * Math.PI / 180) === 0 ? 'Ошибка' : 1/Math.tan(val * Math.PI / 180);
          break;
      }
      currentNumber = res.toString();
      expression = expression.replace(/(\d*\.?\d+)$|(-\d*\.?\d+)$/, currentNumber);
      updateDisplay(currentNumber);
      justEvaluated = false;
      dotLock = false;
    });
  });

  // Инициализация
  updateDisplay('0');
}); 