class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise}
     */
    async get(url) {
        try {
            const response = await fetch(url);
            return this._handleResponse(response);
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise}
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    /**
     * PUT запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise}
     */
    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise}
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }

    /**
     * Обработчик ответа
     * @param {Response} response - Объект ответа fetch
     * @returns {Promise}
     */
    async _handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        try {
            const data = await response.json();
            return { data };
        } catch (error) {
            console.error('Ошибка парсинга JSON:', error);
            throw error;
        }
    }
}

export const ajax = new Ajax();