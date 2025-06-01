import { Component } from '../component.js';

const APP_ICONS = {
  vk: 'icons/vk-v2-svgrepo-com.svg',
  whatsapp: 'icons/whatsapp-svgrepo-com.svg',
  telegram: 'icons/telegram-svgrepo-com.svg',
  twitch: 'icons/twitch-v2-svgrepo-com.svg',
  tiktok: 'icons/tiktok.svg',
  youtube: 'icons/youtube.svg',
};

export class ProductCard extends Component {
  constructor(tariff) {
    super();
    this.tariff = tariff;
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  getPriceDisplay() {
    const pricePrefix = this.tariff.pricePrefix ? `<span style="color:#00B5FF;font-size:1.1rem;font-weight:600;">${this.tariff.pricePrefix}</span> ` : '';
    const pricePeriod = this.tariff.pricePeriod ? `<span style="font-size:1rem;font-weight:400;">${this.tariff.pricePeriod}</span>` : '<span style="font-size:1rem;font-weight:400;">за 30 дней</span>';
    
    return `
      <div style="white-space:nowrap;">
        ${pricePrefix}
        <span style="font-size:1.5rem;font-weight:700;">${this.tariff.price}</span> ₽
        ${pricePeriod}
      </div>
    `;
  }

  getAppsDisplay() {
    if (this.tariff.apps && this.tariff.apps.length > 0) {
      const appIcons = this.tariff.apps
        .map(app => `<img src="${APP_ICONS[app]}" alt="${app}" width="24" height="24" style="background:#f5f5f5;border-radius:50%;padding:2px;margin-right:2px;">`)
        .join('');
      return `
        <div class="tariff-desc mb-2 w-100" style="color:#6c757d;font-size:1rem;">Безлимитные приложения</div>
        <div class="mb-3 d-flex align-items-center w-100" style="gap:0;">${appIcons}</div>
      `;
    }
    return `
      <div class="tariff-desc mb-2 w-100" style="color:#6c757d;font-size:1rem;">Безлимитные приложения</div>
      <div class="mb-3 w-100" style="color:#b0b0b0;font-size:1rem;">-</div>
    `;
  }

  getActionsDisplay() {
    if (this.isAdmin) {
      return `
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary edit-tariff" data-id="${this.tariff.id}">✏️ Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-tariff" data-id="${this.tariff.id}">🗑️ Delete</button>
        </div>
        ${this.getPriceDisplay()}
      `;
    }
    return `
      <a href="#/product/${this.tariff.id}" class="btn btn-yota flex-shrink-0" style="min-width:120px;max-width:150px;background:#00B5FF;color:#fff;font-weight:700;border-radius:2rem;white-space:nowrap;">Подробнее</a>
      ${this.getPriceDisplay()}
    `;
  }

  render() {
    const badge = this.tariff.badge ? `<span class="badge bg-light text-primary ms-2" style="font-size:0.95rem;font-weight:600;vertical-align:middle;">${this.tariff.badge}</span>` : '';
    const oldPrice = this.tariff.oldPrice ? `<span style="color:#b0b0b0;text-decoration:line-through;font-size:1.1rem;font-weight:500;">${this.tariff.oldPrice} ₽</span>` : '';
    const subInfo = this.tariff.subInfo ? `<div class="d-flex align-items-center gap-2 mt-2" style="color:#00B5FF;font-size:1rem;"><span style="font-size:1.2rem;">&#128176;</span> ${this.tariff.subInfo}</div>` : '';
    
    this.el.className = 'col';
    this.el.innerHTML = `
      <div class="tariff-card h-100 d-flex flex-column justify-content-between p-4" style="min-width:320px;max-width:370px;height:440px;border-radius:1.25rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.04);background:#fff;">
        <div class="d-flex flex-column h-100" style="align-items:flex-start;padding-left:8px;">
          <div class="d-flex align-items-center justify-content-between mb-2 w-100">
            <div class="tariff-title" style="font-size:1.15rem; font-weight:900; color:#2D3A43;">${this.tariff.name}</div>
            ${badge}
          </div>
          <div class="d-flex align-items-end mb-2 w-100" style="gap:1.2rem;">
            <div style="font-size:2rem;font-weight:700;">${this.tariff.internet} <span style="font-size:1rem;font-weight:400;">ГБ</span></div>
            <div style="font-size:2rem;font-weight:700;">${this.tariff.minutes} <span style="font-size:1rem;font-weight:400;">мин</span></div>
          </div>
          ${this.getAppsDisplay()}
          ${oldPrice ? `<div class="mb-1 w-100">${oldPrice} <span style="color:#222;font-weight:600;font-size:1.1rem;">${this.tariff.priceYear || ''}</span> <span style="font-size:1rem;font-weight:400;">за 360 дней</span></div>` : ''}
          ${subInfo}
        </div>
        <div class="d-flex align-items-center justify-content-between mt-3 gap-2 flex-nowrap w-100" style="margin-top:auto;min-height:48px;">
          ${this.getActionsDisplay()}
        </div>
      </div>
    `;

    return this.el;
  }

  updateAdminDisplay() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    const actionsContainer = this.el.querySelector('.d-flex.align-items-center.justify-content-between.mt-3.gap-2.flex-nowrap.w-100');
    if (actionsContainer) {
      actionsContainer.innerHTML = this.getActionsDisplay();
    }
  }
} 