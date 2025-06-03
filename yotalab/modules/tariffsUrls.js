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

    getTariffByPrice(price) {
        return `${this.baseUrl}/tariffs?price=${price}`;
    }

    createTariff() {
        return `${this.baseUrl}/tariffs`;
    }

    removeTariffById() {
        return `${this.baseUrl}/tariffs/${id}`;
    }

    updateTariffById() {
        return `${this.baseUrl}/tariffs/${id}`;
    }
}

export const tariffUrls = new TariffUrls();