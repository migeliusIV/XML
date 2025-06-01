import { Component } from '../component.js';
import { AVAILABLE_APPS } from '../tariff-form/index.js'; // Импортируем доступные приложения

export class Product extends Component {
  constructor(tariff) {
    super();
    this.tariff = tariff;
  }
  render() {
    // Using a fragment or a simple div to avoid the Bootstrap card style
    // this.el = document.createElement('div'); // REMOVED: Use the element created in constructor
    this.el.className = 'product-details product-container'; // Add classes for specific styling

    const tariff = this.tariff;

    this.el.innerHTML = `
      <div class="mb-2">
        <h2 class="tariff-section-title text-center mb-4">Тариф "${tariff.name}"</h2>
        <div class="list-group list-group-flush mb-0">
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Звонки</span>
            <span class="tariff-value fw-bold text-primary">${tariff.minutes} минут</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Интернет</span>
            <span class="tariff-value fw-bold text-primary">${tariff.internet}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Безлимит на приложения</span>
            <span>
              ${tariff.apps && tariff.apps.length > 0 ? 
                  tariff.apps.map(appKey => {
                    const app = AVAILABLE_APPS[appKey];
                    return app ? `<img src="../../${app.icon}" alt="${app.name}" style="width: 24px; height: 24px; margin-right: 4px;">` : '';
                  }).join('')
                  : '-'
               }
            </span>
          </div>
        </div>

        <!-- Tariff Description formatted as list-group-item -->
        <div class="list-group list-group-flush mb-0">
          <div class="list-group-item py-3">
            <h4 class="mb-2" style="font-size: 1rem; font-weight: 600;">Описание тарифа</h4>
            <p class="mb-0" style="font-size: 0.9em;">${tariff.description}</p>
          </div>
        </div>

        <!-- Additional Features formatted as list-group-item -->
        ${tariff.features && tariff.features.length > 0 ? `
          <div class="list-group list-group-flush mb-0">
            <div class="list-group-item py-3">
              <h4 class="mb-2" style="font-size: 1rem; font-weight: 600;">Дополнительные особенности</h4>
              <ul class="mb-0" style="font-size: 0.9em; padding-left: 20px;">
                ${tariff.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
        ` : ''}

        <!-- Price section -->
        <div class="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-3 mb-4">
          <div class="price-info" style="font-size: 1.5em; font-weight: bold;">
            ${tariff.price} ₽ <span style="font-size: 0.7em; font-weight: normal;">за 30 дней</span>
          </div>
        </div>
      </div>
      
    `; // Removed inline styles

    return this.el;
  }
} 