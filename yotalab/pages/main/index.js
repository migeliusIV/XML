import { Page } from '../page.js';
import { Header } from '../../components/header/index.js';
import { Carousel } from '../../components/carousel/index.js';
import { ProductCard } from '../../components/product-card/index.js';
import { TariffForm } from '../../components/tariff-form/index.js';
import { AdminToggle } from '../../components/admin-toggle/index.js';
import { Modal } from '../../components/modal/index.js';
import { getAllTariffs, addTariff, editTariff, deleteTariff, getTariffById } from '../../data/tariffsAPI.js';

export class MainPage extends Page {
  constructor() {
    super();
    console.log('MainPage constructor');
    this.state = {
      showForm: false,
      editingTariff: null,
      isAdmin: localStorage.getItem('isAdmin') === 'true'
    };

    this.tariffCards = [];
    this.tariffListListenerAdded = false;

    // Обработчик обновления тарифов
    window.addEventListener('tariffsUpdated', (e) => {
      console.log('Tariffs updated event received (constructor)');
      if (!e.detail || e.detail.needFullRefresh !== false) {
        this.renderTariffsList();
      }
    });

    // Обработчик изменения режима администратора
    window.addEventListener('adminModeChanged', (e) => {
      console.log('Admin mode changed (constructor):', e.detail.isAdmin);
      localStorage.setItem('isAdmin', e.detail.isAdmin);
      window.location.reload();
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
    window.addEventListener('deleteTariff', async (e) => {
      console.log('Delete tariff event received:', e.detail.tariffId);
      try {
        await deleteTariff(e.detail.tariffId);
        this.removeTariffCard(e.detail.tariffId);
      } catch (error) {
        console.error('Failed to delete tariff:', error);
      }
    });

    // Обработчик показа деталей тарифа
    window.addEventListener('showTariffDetails', (e) => {
      console.log('Show tariff details event received (constructor):', e.detail.tariffId);
      window.location.hash = `#/product/${e.detail.tariffId}`;
    });

    this.setupTariffListListener();
  }

  setupTariffListListener() {
    const list = this.el.querySelector('#tariff-list');
    if (list && !this.tariffListListenerAdded) {
      console.log('Adding tariff list click listener (constructor)');
      list.addEventListener('click', (e) => {
        const target = e.target;
        const cardElement = target.closest('.tariff-card');
        if (!cardElement) return;

        const idElement = cardElement.querySelector('[data-id]');
        const tariffId = parseInt(idElement ? idElement.dataset.id : cardElement.dataset.id);
        if (isNaN(tariffId)) return;

        const editButton = target.closest('.edit-tariff');
        const deleteButton = target.closest('.delete-tariff');
        const detailsButton = target.closest('.details-btn');

        if (editButton) {
          window.dispatchEvent(new CustomEvent('editTariff', { 
            detail: { tariffId }
          }));
        } else if (deleteButton) {
          if (confirm('Вы уверены, что хотите удалить этот тариф?')) {
            window.dispatchEvent(new CustomEvent('deleteTariff', { 
              detail: { tariffId }
            }));
          }
        } else if (detailsButton) {
          if (target.tagName !== 'A') {
            e.preventDefault();
            window.location.hash = `#/product/${tariffId}`;
          }
        } else {
          window.location.hash = `#/product/${tariffId}`;
        }
      });
      this.tariffListListenerAdded = true;
    } else if (!this.tariffListListenerAdded) {
      requestAnimationFrame(() => this.setupTariffListListener());
    }
  }

  render() {
    console.log('Rendering main page...');
    this.el.innerHTML = `
      <div id="header-container"></div>
      <div class="container">
        <div id="carousel-container"></div>
        <div class="tariff-section-title mb-4">Мобильная связь</div>
        <div class="row row-cols-1 row-cols-md-3 g-2" id="tariff-list"></div>
      </div>
    `;

    this.header = new Header();
    const headerContainer = this.el.querySelector('#header-container');
    if (headerContainer) headerContainer.appendChild(this.header.render());

    const carousel = new Carousel();
    const carouselContainer = this.el.querySelector('#carousel-container');
    if (carouselContainer) carouselContainer.appendChild(carousel.render());

    const adminToggle = new AdminToggle();
    this.el.appendChild(adminToggle.render());

    this.renderTariffsList();
    return this.el;
  }

  async renderTariffsList() {
    console.log('Rendering tariffs list...');
    const list = this.el.querySelector('#tariff-list');
    if (!list) {
      console.error('Tariff list container not found!');
      return;
    }

    const scrollPosition = window.scrollY;
    list.innerHTML = '';
    
    try {
      const tariffs = await getAllTariffs();
      console.log('Found tariffs:', tariffs);
      
      if (Array.isArray(tariffs)) {
        this.tariffCards = tariffs.map(tariff => {
          const existingCard = this.tariffCards.find(c => c.tariff.id === tariff.id);
          return existingCard || new ProductCard(tariff);
        });

        this.tariffCards.forEach(card => {
          list.appendChild(card.render());
        });
      } else {
        console.error('Expected tariffs to be an array but got:', tariffs);
      }
    } catch (error) {
      console.error('Failed to load tariffs:', error);
      list.innerHTML = '<div class="alert alert-danger">Ошибка загрузки тарифов</div>';
    }

    window.scrollTo(0, scrollPosition);
  }

  removeTariffCard(tariffId) {
    const list = this.el.querySelector('#tariff-list');
    if (!list) return;

    const cardElement = list.querySelector(`[data-id="${tariffId}"]`);
    if (cardElement) cardElement.remove();

    this.tariffCards = this.tariffCards.filter(card => {
      if (card.tariff.id === tariffId) {
        card.el = null;
        return false;
      }
      return true;
    });
  }

  async showTariffForm(tariffId = null) {
    if (!this.state.isAdmin) return;
    
    console.log('Showing tariff form for tariffId:', tariffId);
    const tariff = tariffId ? await getTariffById(tariffId) : null;
    
    const form = new TariffForm(tariff);
    const formElement = form.render();
    const modal = new Modal(formElement);
    document.body.appendChild(modal.render());

    formElement.addEventListener('tariffSubmit', async (e) => {
      const { tariffData, isEdit, tariffId } = e.detail;
      try {
        if (isEdit) {
          await editTariff(tariffId, tariffData);
        } else {
          await addTariff(tariffData);
        }
        modal.el.remove();
        this.state.showForm = false;
      } catch (error) {
        console.error('Failed to save tariff:', error);
      }
    });

    formElement.addEventListener('tariffFormCancel', () => {
      modal.el.remove();
      this.state.showForm = false;
    });
  }
}