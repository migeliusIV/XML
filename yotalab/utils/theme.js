// utils/theme.js

function applyTheme(isDark) {
  const body = document.body;
  if (isDark) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
}

export function initTheme(themeToggle = null) {
  // Проверяем сохраненную тему при загрузке страницы
  const savedTheme = localStorage.getItem('darkTheme');
  const isDark = savedTheme === 'true';
  
  // Применяем тему
  applyTheme(isDark);
  
  // Если передан переключатель, обновляем его состояние
  if (themeToggle) {
    themeToggle.checked = isDark;
  }
}

export function toggleTheme(event) {
  const isDarkTheme = event.target.checked;
  applyTheme(isDarkTheme);
  // Сохраняем состояние темы в localStorage
  localStorage.setItem('darkTheme', isDarkTheme);
  
  // Диспатчим событие для уведомления компонентов
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark: isDarkTheme } }));
} 