import { Router } from './router.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);
  
  // Создаем и инициализируем роутер
  new Router();
}); 