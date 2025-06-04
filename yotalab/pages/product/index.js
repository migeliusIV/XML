import { Page } from '../page.js';
import { Product } from '../../components/product/index.js';
import { Header } from '../../components/header/index.js';
// Было
//import { getTariffById } from '../../data/tariffsData.js';
// Стало
import { getTariffById } from '../../data/tariffsAPI.js'

export class ProductPage extends Page {
  constructor(id) {
    super();
    this.id = id;
  }
  render() {
    try {
      // Get tariff from the data module
      const tariff = getTariffById(this.id);

      if (!tariff) {
        this.el.innerHTML = '<h2>Тариф не найден</h2>';
        return this.el;
      }
      
      // Clear previous content
      this.el.innerHTML = '';

      // Create a container div similar to the main page
      const container = document.createElement('div');
      container.className = 'container mt-2'; // Уменьшаем верхний отступ контейнера

      // Add the header
      const header = new Header();
      this.el.prepend(header.render()); // Prepend header to the page element

      // Create a row and column to center the product card
      const row = document.createElement('div');
      row.className = 'row justify-content-center'; // Center the row

      const col = document.createElement('div');
      col.className = 'col-md-8 col-lg-6'; // Set column width for medium and large screens and center it

      // Create the product component and append it to the column
      const product = new Product(tariff);
      col.appendChild(product.render());

      // Remove the ProductCard component
      // const productCard = new ProductCard(tariff);
      // col.appendChild(productCard.render());

      // Append column to row, and row to container
      row.appendChild(col);
      container.appendChild(row);

      // Append the container to the page element
      this.el.appendChild(container);

      // Add the "Просто, быстро, удобно" section back
      const easyFastConvenientSection = document.createElement('div');
      easyFastConvenientSection.className = 'text-center mb-5 d-flex flex-column align-items-center'; // Уменьшаем нижний отступ и центрируем
      easyFastConvenientSection.innerHTML = `
        <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center" style="max-width: 800px;">
          <!-- Card 1: Оформить -->
          <div class="col">
            <div class="card h-100 text-center p-3">
              <img src="icons/esim_banner_d.png" class="card-img-top mx-auto mb-3" alt="Оформить" style="width: auto; height: 80px;">
              <div class="card-body p-0">
                <h5 class="card-title">Оформить</h5>
                <p class="card-text" style="font-size: 0.9em; color: #6c757d;">Можно с 14 лет - нужен паспорт. Занимает 1 минуту.</p>
              </div>
            </div>
          </div>
          <!-- Card 2: Получить -->
          <div class="col">
            <div class="card h-100 text-center p-3">
              <img src="icons/samokat_d.svg.png" class="card-img-top mx-auto mb-3" alt="Получить" style="width: auto; height: 80px;">
              <div class="card-body p-0">
                <h5 class="card-title">Получить</h5>
                <p class="card-text" style="font-size: 0.9em; color: #6c757d;">С доставкой от 30 минут или забрать самому в точке продаж.</p>
              </div>
            </div>
          </div>
          <!-- Card 3: Быть на связи -->
          <div class="col">
            <div class="card h-100 text-center p-3">
              <img src="icons/podkluchi_maximum_desc.png" class="card-img-top mx-auto mb-3" alt="Быть на связи" style="width: auto; height: 80px;">
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
    } catch (error) {
        console.error('Failed to load tariff:', error);
        this.el.innerHTML = '<h2>Ошибка загрузки тарифа</h2>';
        return this.el;
    }
  }
} 