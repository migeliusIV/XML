import { Component } from '../component.js';
import { initTheme, toggleTheme } from '../../utils/theme.js';

export class Header extends Component {
  constructor() {
    super();
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  render() {
    this.el.innerHTML = `
      <header class="yota-header py-3 mb-4">
        <div class="container d-flex align-items-center justify-content-between">
          <a href="#/" class="yota-logo text-decoration-none fw-bold" style="font-size:2rem;color:#00B5FF;letter-spacing:2px;">YOTA</a>
          <div class="d-flex align-items-center gap-3">
            <a href="calculator.html" class="btn btn-outline-primary" style="border-radius: 0.5rem;">Калькулятор</a>
            <!-- Переключатель темы -->
            <label class="switch">
              <input type="checkbox" id="theme-toggle">
              <span class="slider round"></span>
            </label>
            ${this.isAdmin ? `
              <button class="btn btn-yota" id="add-tariff-header-btn" style="border-radius: 0.5rem; background: #00B5FF; color: white; border: none;">
                <span style="font-size: 1.2rem;">➕</span> Добавить тариф
              </button>
            ` : ''}
          </div>
        </div>
      </header>
    `;

    // Добавляем обработчик для кнопки добавления тарифа
    const addButton = this.el.querySelector('#add-tariff-header-btn');
    if (addButton) {
      addButton.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('addTariff'));
      });
    }

    // Добавляем обработчик для переключателя темы и инициализируем тему
    const themeToggle = this.el.querySelector('#theme-toggle');
    if (themeToggle) {
      // Сначала инициализируем тему и состояние переключателя
      initTheme(themeToggle);
      
      // Затем добавляем обработчик изменений
      themeToggle.addEventListener('change', (event) => {
        toggleTheme(event);
      });
    }

    // Подписываемся на изменение режима администратора
    window.addEventListener('adminModeChanged', (e) => {
      this.isAdmin = e.detail.isAdmin;
      this.render();
    });

    return this.el;
  }
} 