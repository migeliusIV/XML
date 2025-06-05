import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';
import { initTheme } from './utils/theme.js';

const routes = {
  '': MainPage,
  '#/': MainPage,
  '#/product': ProductPage,
};

function parseRoute() {
  const hash = location.hash.split('/');
  if (hash[1] === 'product' && hash[2]) {
    return { route: '#/product', id: hash[2] };
  }
  return { route: location.hash || '', id: null };
}

async function render() {
  const { route, id } = parseRoute();
  const app = document.getElementById('app');
  app.innerHTML = '';
  const PageClass = routes[route] || MainPage;
  const page = new PageClass(id);
  const pageElement = await page.render();
  app.appendChild(pageElement);
}

// Make render function globally accessible
window.render = render;

window.addEventListener('hashchange', () => render());
window.addEventListener('DOMContentLoaded', async () => {
  await render(); // Рендерим начальную страницу
  initTheme(); // Инициализируем тему при загрузке главной страницы
}); 