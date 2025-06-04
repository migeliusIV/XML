import { Page } from '../page.js';
import { Product } from '../../components/product/index.js';
import { Header } from '../../components/header/index.js';
import { getTariffById } from '../../data/tariffsAPI.js'

export class ProductPage extends Page {
  constructor(id) {
    super();
    this.id = parseInt(id);
  }

  async init() {
    try {
      this.tariff = await getTariffById(this.id);
      if (!this.tariff) {
        throw new Error('Tariff not found');
      }
    } catch (error) {
      console.error('Failed to load tariff:', error);
      this.tariff = null;
    }
  }

  render() {
    if (!this.tariff) {
      this.el.innerHTML = '<div class="container"><h2 class="text-center mt-5">Тариф не найден</h2></div>';
      return this.el;
    }

    // Clear previous content
    this.el.innerHTML = '';

    // Add the header
    const header = new Header();
    this.el.appendChild(header.render());

    // Create the main container
    const container = document.createElement('div');
    container.className = 'container mt-4';

    // Create a row and column to center the product card
    const row = document.createElement('div');
    row.className = 'row justify-content-center';

    const col = document.createElement('div');
    col.className = 'col-md-8 col-lg-6';

    // Create the product component and append it to the column
    const product = new Product(this.tariff);
    col.appendChild(product.render());

    // Append elements to the page
    row.appendChild(col);
    container.appendChild(row);
    this.el.appendChild(container);

    // Add the "Просто, быстро, удобно" section
    const easyFastConvenientSection = document.createElement('div');
    easyFastConvenientSection.className = 'container text-center mt-5';
    easyFastConvenientSection.innerHTML = `
      <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
        <div class="col">
          <div class="card h-100 text-center p-3">
            <img src="../../icons/esim_banner_d.png" class="card-img-top mx-auto mb-3" alt="Оформить" style="width: auto; height: 80px;">
            <div class="card-body p-0">
              <h5 class="card-title">Оформить</h5>
              <p class="card-text" style="font-size: 0.9em; color: #6c757d;">Можно с 14 лет - нужен паспорт. Занимает 1 минуту.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 text-center p-3">
            <img src="../../icons/samokat_d.svg.png" class="card-img-top mx-auto mb-3" alt="Получить" style="width: auto; height: 80px;">
            <div class="card-body p-0">
              <h5 class="card-title">Получить</h5>
              <p class="card-text" style="font-size: 0.9em; color: #6c757d;">С доставкой от 30 минут или забрать самому в точке продаж.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 text-center p-3">
            <img src="../../icons/podkluchi_maximum_desc.png" class="card-img-top mx-auto mb-3" alt="Быть на связи" style="width: auto; height: 80px;">
            <div class="card-body p-0">
              <h5 class="card-title">Быть на связи</h5>
              <p class="card-text" style="font-size: 0.9em; color: #6c757d;">С новым номером или с сохранением своего.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    this.el.appendChild(easyFastConvenientSection);

    return this.el;
  }
} 