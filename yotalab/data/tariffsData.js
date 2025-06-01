// Функция для получения данных из localStorage
const getStoredData = () => {
  const storedData = localStorage.getItem('tariffs');
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      if (parsed && typeof parsed.tariffs === 'object' && typeof parsed.nextId === 'number') {
        return {
          tariffs: parsed.tariffs,
          nextId: parsed.nextId
        };
      }
    } catch (e) {
      console.error('Error parsing stored tariffs:', e);
    }
  }
  // Если нет сохраненных данных или они некорректны, начинаем с пустого списка
  return {
    tariffs: {},
    nextId: 1
  };
};

// Инициализация данных
let { tariffs, nextId } = getStoredData();

// Функция для сохранения данных в localStorage
const saveData = () => {
  try {
    localStorage.setItem('tariffs', JSON.stringify({ tariffs, nextId }));
  } catch (e) {
    console.error('Error saving tariffs:', e);
  }
};

// Функция для обновления UI после изменений
const notifyUpdate = () => {
  window.dispatchEvent(new CustomEvent('tariffsUpdated'));
};

export const getAllTariffs = () => {
  return Object.values(tariffs);
};

export const getTariffById = (id) => {
  return tariffs[id];
};

export const addTariff = (newTariff) => {
  const id = nextId++;
  tariffs[id] = { ...newTariff, id };
  saveData();
  notifyUpdate();
  return id;
};

export const editTariff = (id, updatedTariff) => {
  if (tariffs[id]) {
    tariffs[id] = { ...tariffs[id], ...updatedTariff, id: parseInt(id, 10) };
    saveData();
    notifyUpdate();
    return true;
  }
  return false;
};

export const deleteTariff = (id) => {
  if (tariffs[id]) {
    delete tariffs[id];
    saveData();
    notifyUpdate();
    return true;
  }
  return false;
};

// Функция для сброса данных к начальным значениям
export const resetToDefaults = () => {
  tariffs = { ...defaultTariffs }; // Создаем новую копию дефолтных тарифов
  nextId = 4;
  saveData();
  notifyUpdate();
};

// Функция для очистки всех данных
export const clearAllTariffs = () => {
  tariffs = {};
  nextId = 1;
  saveData();
  notifyUpdate();
}; 