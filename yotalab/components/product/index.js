import { Component } from '../component.js';
import { AVAILABLE_APPS } from '../tariff-form/index.js';

export class Product extends Component {
  constructor(tariff) {
    super();
    this.tariff = tariff;
  }

  render() {
    this.el.className = 'product-details product-container';

    if (!this.tariff) {
      this.el.innerHTML = '<div class="alert alert-danger">Тариф не найден</div>';
      return this.el;
    }

    const tariff = this.tariff;

    this.el.innerHTML = `
      <div class="mb-2">
        <h2 class="tariff-section-title text-center mb-4">Тариф "${tariff.name}"</h2>
        <div class="list-group list-group-flush mb-0">
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Звонки</span>
            <span class="tariff-value fw-bold text-primary">${this.formatMinutes(tariff.minutes)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Интернет</span>
            <span class="tariff-value fw-bold text-primary">${this.formatInternetGb(tariff.internet_gb)}</span>
          </div>
          <div class="list-group-item d-flex justify-content-between align-items-center py-3">
            <span>Безлимит на приложения</span>
            <span>
              ${tariff.unlimited_apps && tariff.unlimited_apps.length > 0 ? 
                  tariff.unlimited_apps.map(appKey => {
                    const app = AVAILABLE_APPS[appKey];
                    return app ? `<img src="../../${app.icon}" alt="${app.name}" style="width: 24px; height: 24px; margin-right: 4px;">` : '';
                  }).join('')
                  : '-'
               }
            </span>
          </div>
        </div>

        ${tariff.description ? `
        <div class="list-group list-group-flush mb-0">
          <div class="list-group-item py-3">
            <h4 class="mb-2" style="font-size: 1rem; font-weight: 600;">Описание тарифа</h4>
            <p class="mb-0" style="font-size: 0.9em;">${tariff.description}</p>
          </div>
        </div>
        ` : ''}

        ${tariff.additional_features && Object.keys(tariff.additional_features).length > 0 ? `
          <div class="list-group list-group-flush mb-0">
            <div class="list-group-item py-3">
              <h4 class="mb-2" style="font-size: 1rem; font-weight: 600;">Дополнительные особенности</h4>
              <ul class="mb-0" style="font-size: 0.9em; padding-left: 20px;">
                ${Object.values(tariff.additional_features).map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
        ` : ''}

        <div class="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-3 mb-4">
          <div class="price-info" style="font-size: 1.5em; font-weight: bold;">
            ${this.formatPrice(tariff.price)} ₽ <span style="font-size: 0.7em; font-weight: normal;">за 30 дней</span>
          </div>
        </div>
      </div>`;

    return this.el;
  }

  formatMinutes(minutes) {
    return minutes === -1 ? 'Безлимит' : `${minutes} минут`;
  }

  formatInternetGb(gb) {
    return gb === -1 ? 'Безлимит' : `${gb} ГБ`;
  }

  formatPrice(price) {
    return Number(price).toLocaleString('ru-RU');
  }
} 