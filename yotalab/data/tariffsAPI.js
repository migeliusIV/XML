import { ajax } from '../modules/ajax.js';
import { tariffUrls } from '../modules/tariffsUrls.js';

export const tariffsService = {
  async getAllTariffs() {
    try {
      const response = await ajax.get(tariffUrls.getTariff());
      return response?.data || [];
    } catch (error) {
      console.error('Failed to fetch tariffs:', error);
      throw error;
    }
  },

  async getTariffById(id) {
    try {
      const response = await ajax.get(tariffUrls.getTariffById(id));
      return response?.data || null;
    } catch (error) {
      console.error(`Failed to fetch tariff ${id}:`, error);
      throw error;
    }
  }
};