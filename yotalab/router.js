import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';

export class Router {
  constructor() {
    this.routes = {
      '/': MainPage,
      '/product': ProductPage
    };

    this.currentPage = null;

    // Обработчик изменения хэша
    window.addEventListener('hashchange', () => this.handleRoute());
    // Обработка начального маршрута
    this.handleRoute();
  }

  getPath() {
    const hash = window.location.hash.slice(1); // Убираем #
    return hash || '/';
  }

  async handleRoute() {
    const path = this.getPath();
    const [basePath, ...params] = path.split('/');
    const route = '/' + (basePath || '');
    
    const Page = this.routes[route];
    if (Page) {
      // Очищаем контейнер
      const container = document.getElementById('app');
      container.innerHTML = '';
      
      // Создаем и рендерим новую страницу
      const page = new Page(params[0]); // Передаем первый параметр (например, ID тарифа)
      
      // Если у страницы есть метод init, вызываем его перед рендерингом
      if (page.init) {
        await page.init();
      }
      
      container.appendChild(page.render());
      this.currentPage = page;
    } else {
      console.error('Route not found:', route);
      window.location.hash = '#/';
    }
  }
} 