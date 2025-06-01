import { Page } from '../page.js';
import { Header } from '../../components/header/index.js';
import { Carousel } from '../../components/carousel/index.js';
import { ProductCard } from '../../components/product-card/index.js';
import { TariffForm } from '../../components/tariff-form/index.js';
import { AdminToggle } from '../../components/admin-toggle/index.js';
import { Modal } from '../../components/modal/index.js';
import { getAllTariffs, addTariff, editTariff, deleteTariff, getTariffById } from '../../data/tariffsData.js';

export class MainPage extends Page {
  constructor() {
    super();
    console.log('MainPage constructor');
    this.state = {
      showForm: false,
      editingTariff: null,
      isAdmin: localStorage.getItem('isAdmin') === 'true'
    };

    // Массив для хранения экземпляров ProductCard
    this.tariffCards = [];

    // Флаг для гарантии однократного добавления слушателя кликов на список тарифов
    this.tariffListListenerAdded = false;

    // Подписываемся на события только один раз при создании экземпляра страницы

    // Обработчик обновления тарифов: перерисовывает весь список
    window.addEventListener('tariffsUpdated', () => {
      console.log('Tariffs updated event received (constructor)');
      this.renderTariffsList(); // При обновлении данных все равно нужно перерисовать весь список
    });

    // Обработчик изменения режима администратора: перезагружаем страницу
    window.addEventListener('adminModeChanged', (e) => {
      console.log('Admin mode changed (constructor):', e.detail.isAdmin);
      // Сохраняем новый режим в localStorage
      localStorage.setItem('isAdmin', e.detail.isAdmin);
      // Перезагружаем страницу для полной очистки состояния
      window.location.reload(); // Принудительная перезагрузка для сброса состояния
    });

    // Обработчик добавления тарифа
    window.addEventListener('addTariff', () => {
      console.log('Add tariff event received (constructor)');
      this.showTariffForm();
    });

    // Обработчик редактирования тарифа
    window.addEventListener('editTariff', (e) => {
      console.log('Edit tariff event received (constructor):', e.detail.tariffId);
      this.showTariffForm(e.detail.tariffId);
    });

    // Обработчик удаления тарифа
    window.addEventListener('deleteTariff', (e) => {
      console.log('Delete tariff event received (constructor):', e.detail.tariffId);
      deleteTariff(e.detail.tariffId);
    });

    // Обработчик показа деталей тарифа
    window.addEventListener('showTariffDetails', (e) => {
      console.log('Show tariff details event received (constructor):', e.detail.tariffId);
      window.location.hash = `#/product/${e.detail.tariffId}`;
    });

    // Добавляем один обработчик кликов на контейнер списка тарифов (делегирование событий) в конструкторе
    // Это гарантирует, что обработчик добавится только один раз при создании страницы.
    // Используем requestAnimationFrame для гарантии, что #tariff-list элемент существует в DOM.
    const setupTariffListListener = () => {
        const list = this.el.querySelector('#tariff-list');
        if (list && !this.tariffListListenerAdded) {
            console.log('Adding tariff list click listener (constructor)');
            list.addEventListener('click', (e) => {
              const target = e.target;
              // Ищем ближайший элемент с data-id, который находится внутри .tariff-card
              const cardElement = target.closest('.tariff-card');
              if (!cardElement) return; // Клик был не по карточке или ее содержимому

              // Находим элемент с data-id внутри cardElement (это может быть сама карточка или кнопка)
              const idElement = cardElement.querySelector('[data-id]');
              // Если idElement не найден, возможно, клик был по самой карточке, но без data-id (например, по padding)
              // В этом случае, попробуем найти data-id на самой карточке, если он там есть (сейчас data-id на кнопках/ссылке)
              const tariffId = parseInt(idElement ? idElement.dataset.id : cardElement.dataset.id);
              if (isNaN(tariffId)) return; // Не удалось получить корректный tariffId

              // Проверяем, является ли кликнутый элемент или его родитель кнопкой редактирования или удаления
              const editButton = target.closest('.edit-tariff');
              const deleteButton = target.closest('.delete-tariff');
              const detailsButton = target.closest('.details-btn');

              if (editButton) {
                console.log('Edit button clicked (delegation)', tariffId);
                window.dispatchEvent(new CustomEvent('editTariff', { 
                  detail: { tariffId: tariffId }
                }));
              } else if (deleteButton) {
                console.log('Delete button clicked (delegation)', tariffId);
                if (confirm('Вы уверены, что хотите удалить этот тариф?')) {
                  window.dispatchEvent(new CustomEvent('deleteTariff', { 
                    detail: { tariffId: tariffId }
                  }));
                }
              } else if (detailsButton) {
                console.log('Details button clicked (delegation)', tariffId);
                // При клике на кнопку подробнее, просто переходим по ссылке, не диспатчим событие
                // Предотвращаем действие по умолчанию, если это не ссылка
                if (target.tagName !== 'A') {
                    e.preventDefault();
                    window.location.hash = `#/product/${tariffId}`;
                }
              } else { // Если клик был по самой карточке (или другой части, не кнопке/ссылке), переходим на страницу деталей
                console.log('Card background clicked (delegation)', tariffId);
                window.location.hash = `#/product/${tariffId}`;
              }
            });
            this.tariffListListenerAdded = true; // Устанавливаем флаг после добавления слушателя
        } else if (!this.tariffListListenerAdded) {
            console.log('Tariff list element not found, retrying listener setup (constructor)');
            // Если список еще не в DOM, попробуем снова в следующем кадре анимации
            requestAnimationFrame(setupTariffListListener);
        }
    };

    // Запускаем установку слушателя сразу
    setupTariffListListener();

  }

  render() {
    console.log('Rendering main page...');
    // Создаем базовую структуру страницы
    this.el.innerHTML = `
      <div id="header-container"></div>
      <div class="container">
        <div id="carousel-container"></div>
        <div class="tariff-section-title mb-4">Мобильная связь</div>
        <div class="row row-cols-1 row-cols-md-3 g-2" id="tariff-list"></div>
      </div>
    `;

    // Добавляем компоненты
    this.header = new Header();
    const headerContainer = this.el.querySelector('#header-container');
    if (headerContainer) {
      headerContainer.appendChild(this.header.render());
    }

    const carousel = new Carousel();
    const carouselContainer = this.el.querySelector('#carousel-container');
    if (carouselContainer) {
      carouselContainer.appendChild(carousel.render());
    }

    // Добавляем переключатель режима администратора
    const adminToggle = new AdminToggle();
    this.el.appendChild(adminToggle.render());

    // Рендерим список тарифов при первом рендере страницы
    this.renderTariffsList();

    return this.el;
  }

  renderTariffsList() {
    console.log('Rendering tariffs list...');
    const list = this.el.querySelector('#tariff-list');
    if (!list) {
      console.error('Tariff list container not found!');
      return;
    }

    list.innerHTML = '';
    this.tariffCards = []; // Очищаем массив карточек перед новой отрисовкой
    const tariffs = getAllTariffs();
    console.log('Found tariffs:', tariffs);
    
    tariffs.forEach(tariff => {
      const card = new ProductCard(tariff);
      const cardEl = card.render();
      this.tariffCards.push(card); // Сохраняем экземпляр карточки
      list.appendChild(cardEl);
    });

    // УДАЛЕНО: Код добавления обработчика кликов перенесен в render или конструктор

  }

  showTariffForm(tariffId = null) {
    if (!this.state.isAdmin) return;
    
    console.log('Showing tariff form for tariffId:', tariffId);
    
    const tariff = tariffId ? getTariffById(tariffId) : null;
    console.log('Tariff for form:', tariff);
    
    const form = new TariffForm(tariff);
    const formElement = form.render();

    // Создаем модальное окно с формой
    const modal = new Modal(formElement);
    document.body.appendChild(modal.render());

    // Обработка отправки формы
    formElement.addEventListener('tariffSubmit', (e) => {
      console.log('Form submitted:', e.detail);
      const { tariffData, isEdit, tariffId } = e.detail;
      
      if (isEdit) {
        editTariff(tariffId, tariffData);
      } else {
        addTariff(tariffData);
      }
      
      // Закрываем модальное окно
      modal.el.remove();
      this.state.showForm = false;
    });

    // Обработка отмены
    formElement.addEventListener('tariffFormCancel', () => {
      console.log('Form cancelled');
      // Закрываем модальное окно
      modal.el.remove();
      this.state.showForm = false;
    });
  }
} 