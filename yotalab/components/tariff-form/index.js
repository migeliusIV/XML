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
    this.selectedApps = tariff?.unlimited_apps || [];
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
          <img src="/icons/${app.icon}" alt="${app.name}" width="24" height="24" style="background:#f5f5f5;border-radius:50%;padding:2px;">
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
            <label for="internet_gb" class="form-label">Интернет (ГБ)</label>
            <input type="number" class="form-control" id="internet_gb" name="internet_gb" required 
              value="${this.tariff?.internet_gb || ''}" placeholder="Например: 10" style="border-radius: 0.5rem;">
          </div>
          
          <div class="mb-3">
            <label for="minutes" class="form-label">Минуты</label>
            <input type="number" class="form-control" id="minutes" name="minutes" required 
              value="${this.tariff?.minutes || ''}" placeholder="Например: 300 (или -1 для безлимита)" style="border-radius: 0.5rem;">
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
      const featuresText = formData.get('features');
      const features = featuresText ? featuresText.split('\n').filter(f => f.trim()) : [];
      
      // Преобразуем массив особенностей в объект для БД
      const additional_features = features.reduce((obj, feature, index) => {
        obj[`feature_${index + 1}`] = feature;
        return obj;
      }, {});
      
      const tariffData = {
        name: formData.get('name'),
        price: Number(formData.get('price')),
        internet_gb: Number(formData.get('internet_gb')),
        minutes: Number(formData.get('minutes')),
        description: formData.get('description'),
        unlimited_apps: selectedApps,
        additional_features
      };

      // Выводим данные в консоль для отладки
      console.log('Sending tariff data:', tariffData);

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