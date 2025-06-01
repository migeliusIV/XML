import { Component } from '../component.js';

export const AVAILABLE_APPS = {
  vk: { name: 'ВКонтакте', icon: 'icons/vk-v2-svgrepo-com.svg' },
  whatsapp: { name: 'WhatsApp', icon: 'icons/whatsapp-svgrepo-com.svg' },
  telegram: { name: 'Telegram', icon: 'icons/telegram-svgrepo-com.svg' },
  twitch: { name: 'Twitch', icon: 'icons/twitch-v2-svgrepo-com.svg' },
};

export class TariffForm extends Component {
  constructor(tariff = null) {
    super();
    this.tariff = tariff; // Если tariff не null, значит это режим редактирования
    this.selectedApps = tariff?.apps || [];
  }

  render() {
    this.el.className = 'tariff-form';
    
    const title = this.tariff ? 'Редактировать тариф' : 'Добавить новый тариф';
    const submitText = this.tariff ? 'Сохранить изменения' : 'Добавить тариф';
    
    // Создаем HTML для выбора приложений
    const appsHtml = Object.entries(AVAILABLE_APPS).map(([key, app]) => `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" 
          value="${key}" id="app-${key}" name="apps" 
          ${this.selectedApps.includes(key) ? 'checked' : ''}>
        <label class="form-check-label d-flex align-items-center gap-2" for="app-${key}">
          <img src="${app.icon}" alt="${app.name}" width="24" height="24" style="background:#f5f5f5;border-radius:50%;padding:2px;">
          ${app.name}
        </label>
      </div>
    `).join('');

    this.el.innerHTML = `
      <div class="card border-0">
        <h3 class="mb-4" style="font-size: 1.5rem; font-weight: 600;">${title}</h3>
        <form id="tariffForm">
          <div class="mb-3">
            <label for="name" class="form-label">Название тарифа</label>
            <input type="text" class="form-control" id="name" name="name" required 
              value="${this.tariff?.name || ''}" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="price" class="form-label">Цена (₽)</label>
            <input type="text" class="form-control" id="price" name="price" required 
              value="${this.tariff?.price || ''}" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="internet" class="form-label">Интернет</label>
            <input type="text" class="form-control" id="internet" name="internet" required 
              value="${this.tariff?.internet || ''}" placeholder="Например: 10 ГБ или Безлимит" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="minutes" class="form-label">Минуты</label>
            <input type="text" class="form-control" id="minutes" name="minutes" required 
              value="${this.tariff?.minutes || ''}" placeholder="Например: 300 или Безлимит" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="description" class="form-label">Описание</label>
            <textarea class="form-control" id="description" name="description" rows="3" required style="border-radius: 0.5rem;">${this.tariff?.description || ''}</textarea>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Безлимитные приложения</label>
            <div class="apps-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem;">
              ${appsHtml}
            </div>
          </div>
          
          <div class="mb-3">
            <label for="features" class="form-label">Дополнительные особенности (по одной на строку)</label>
            <textarea class="form-control" id="features" name="features" rows="4" required style="border-radius: 0.5rem;">${this.tariff?.features?.join('\n') || ''}</textarea>
          </div>
          
          <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="btn btn-outline-secondary" id="cancelBtn" style="border-radius: 0.5rem;">Отмена</button>
            <button type="submit" class="btn btn-yota" style="border-radius: 0.5rem; background: #00B5FF; color: white; border: none;">${submitText}</button>
          </div>
        </form>
      </div>
    `;

    const form = this.el.querySelector('#tariffForm');
    const cancelBtn = this.el.querySelector('#cancelBtn');

    form.onsubmit = (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const selectedApps = Array.from(formData.getAll('apps'));
      
      const tariffData = {
        name: formData.get('name'),
        price: formData.get('price'),
        internet: formData.get('internet'),
        minutes: formData.get('minutes'),
        description: formData.get('description'),
        features: formData.get('features').split('\n').filter(f => f.trim()),
        apps: selectedApps // Добавляем выбранные приложения
      };

      // Создаем и диспатчим кастомное событие
      const event = new CustomEvent('tariffSubmit', {
        detail: {
          tariffData,
          isEdit: !!this.tariff,
          tariffId: this.tariff?.id
        }
      });
      
      this.el.dispatchEvent(event);
    };

    cancelBtn.onclick = () => {
      const event = new CustomEvent('tariffFormCancel');
      this.el.dispatchEvent(event);
    };

    return this.el;
  }
} 