// ajax.js
class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise}
     */
    get(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    this._handleResponse(xhr, resolve, reject);
                }
            };
        });
    }

    // Аналогично обновляем другие методы (post, patch, delete)
    post(url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    this._handleResponse(xhr, resolve, reject);
                }
            };
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    this._handleResponse(xhr, resolve, reject);
                }
            };
        });
    }

    delete(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', url);
            xhr.send();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    this._handleResponse(xhr, resolve, reject);
                }
            };
        });
    }

    _handleResponse(xhr, resolve, reject) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({ data });
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            reject(e);
        }
    }
}

export const ajax = new Ajax();