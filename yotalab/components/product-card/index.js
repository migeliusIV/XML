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

  getAppsDisplay() {
    if (this.tariff.unlimited_apps && this.tariff.unlimited_apps.length > 0) {
      const appIcons = this.tariff.unlimited_apps
        .map(app => APP_ICONS[app] ? 
          `<img src="${APP_ICONS[app]}" alt="${app}" width="24" height="24" style="background:#f5f5f5;border-radius:50%;padding:2px;margin-right:2px;">` 
          : '')
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
        <div style="white-space:nowrap;">
          <span style="font-size:1.5rem;font-weight:700;">${this.formatPrice(this.tariff.price)}</span> ₽
          <span style="font-size:1rem;font-weight:400;"> за 30 дней</span>
        </div>
      `;
    }
    return `
      <a href="#/product/${this.tariff.id}" class="btn btn-yota flex-shrink-0" style="min-width:120px;max-width:150px;background:#00B5FF;color:#fff;font-weight:700;border-radius:2rem;white-space:nowrap;">Подробнее</a>
      <div style="white-space:nowrap;">
        <span style="font-size:1.5rem;font-weight:700;">${this.formatPrice(this.tariff.price)}</span> ₽
        <span style="font-size:1rem;font-weight:400;"> за 30 дней</span>
      </div>
    `;
  }

  formatMinutes(minutes) {
    return minutes === -1 ? 'Безлимит' : `${minutes} мин`;
  }

  formatInternetGb(gb) {
    return gb === -1 ? 'Безлимит' : `${gb} ГБ`;
  }

  formatPrice(price) {
    return Number(price).toLocaleString('ru-RU');
  }

  render() {
    this.el.className = 'col';
    this.el.innerHTML = `
      <div class="tariff-card h-100 d-flex flex-column justify-content-between p-4" style="min-width:320px;max-width:370px;height:440px;border-radius:1.25rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.04);background:#fff;">
        <div class="d-flex flex-column h-100" style="align-items:flex-start;padding-left:8px;">
          <div class="d-flex align-items-center justify-content-between mb-2 w-100">
            <div class="tariff-title" style="font-size:1.15rem; font-weight:900; color:#2D3A43;">${this.tariff.name}</div>
          </div>
          <div class="d-flex align-items-end mb-2 w-100" style="gap:1.2rem;">
            <div style="font-size:2rem;font-weight:700;">${this.formatInternetGb(this.tariff.internet_gb)}</div>
            <div style="font-size:2rem;font-weight:700;">${this.formatMinutes(this.tariff.minutes)}</div>
          </div>
          ${this.getAppsDisplay()}
          ${this.tariff.description ? `
            <div class="tariff-desc mb-2 w-100" style="color:#6c757d;font-size:1rem;">
              ${this.tariff.description}
            </div>
          ` : ''}
        </div>
        <div class="d-flex align-items-center justify-content-between mt-3 gap-2 flex-nowrap w-100" style="margin-top:auto;min-height:48px;">
          ${this.getActionsDisplay()}
        </div>
      </div>
    `;

    return this.el;
  }
} 