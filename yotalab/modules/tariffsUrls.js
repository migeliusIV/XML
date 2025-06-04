class TariffUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getTariff() {
        return `${this.baseUrl}/tariffs`;
    }

    getTariffById(id) {
        return `${this.baseUrl}/tariffs/${id}`;
    }

    createTariff() {
        return `${this.baseUrl}/tariffs`;
    }

    removeTariffById(id) {  // Fixed: added id parameter
        return `${this.baseUrl}/tariffs/${id}`;
    }

    updateTariffById(id) {  // Fixed: added id parameter
        return `${this.baseUrl}/tariffs/${id}`;
    }
}

export const tariffUrls = new TariffUrls();