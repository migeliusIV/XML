import { ajax } from '../modules/ajax.js';
import { tariffUrls } from '../modules/tariffsUrls.js';

// Локальный кеш тарифов
let tariffsCache = {};
let nextId = 1;

// Функция для обновления UI
const notifyUpdate = () => {
  window.dispatchEvent(new CustomEvent('tariffsUpdated'));
};

// Обновляем кеш при получении данных с сервера
const updateCache = (tariffsArray) => {
  tariffsCache = tariffsArray.reduce((acc, tariff) => {
    acc[tariff.id] = tariff;
    nextId = Math.max(nextId, tariff.id + 1);
    return acc;
  }, {});
};

// Получить все тарифы
export const getAllTariffs = async () => {
  try {
    const response = await ajax.get(tariffUrls.getTariff());
    if (response?.data) {
      updateCache(response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch tariffs:', error);
    throw error;
  }
};

// Получить тариф по ID
export const getTariffById = async (id) => {
  try {
    // Проверяем кеш
    if (tariffsCache[id]) {
      return tariffsCache[id];
    }
    
    // Запрашиваем с сервера
    const response = await ajax.get(tariffUrls.getTariffById(id));
    if (response?.data) {
      tariffsCache[response.data.id] = response.data;
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch tariff ${id}:`, error);
    throw error;
  }
};

// Добавить новый тариф
export const addTariff = async (newTariff) => {
  try {
    console.log('Making POST request with data:', newTariff);
    const response = await ajax.post(tariffUrls.createTariff(), newTariff);
    console.log('Received response:', response);
    
    // Проверяем, есть ли ответ и содержит ли он данные тарифа
    if (response && (response.data || response.id)) {
      const tariffData = response.data || response;
      tariffsCache[tariffData.id] = tariffData;
      nextId = Math.max(nextId, tariffData.id + 1);
      notifyUpdate();
      return tariffData.id;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Failed to create tariff:', error);
    throw error;
  }
};

// Редактировать тариф
export const editTariff = async (id, updatedTariff) => {
  try {
    const response = await ajax.put(tariffUrls.updateTariffById(id), {
      ...updatedTariff,
      id: parseInt(id, 10)
    });
    
    if (response?.data) {
      tariffsCache[id] = response.data;
      notifyUpdate();
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Failed to update tariff ${id}:`, error);
    throw error;
  }
};

// Удалить тариф
export const deleteTariff = async (id) => {
  try {
    await ajax.delete(tariffUrls.removeTariffById(id));
    delete tariffsCache[id];
    notifyUpdate();
    return true;
  } catch (error) {
    console.error(`Failed to delete tariff ${id}:`, error);
    throw error;
  }
};

// Сбросить к значениям по умолчанию (заглушка)
export const resetToDefaults = async () => {
  console.warn('resetToDefaults() not implemented for API version');
  return false;
};

// Очистить все тарифы (заглушка)
export const clearAllTariffs = async () => {
  console.warn('clearAllTariffs() not implemented for API version');
  return false;
};