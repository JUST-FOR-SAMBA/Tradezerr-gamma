
import axios from "./https"

class Service {
    static handleError = (err) => {
        if (!err.response) {
            return {
                error: 'It seems that you are offline. Try to check your network cable.',
            };
        }
        const { data } = err.response;
        const { error, message, status } = data;

        if (message) {
            return { error: message, status };
        }

        if (typeof error !== 'string') {
            return { error: 'Unknown error', status };
        }
        return { error, status };
    };

    static resolveResponse = (response) => {
        const { error, message, data, status } = response.data;
        return {
            status,
            message,
            data,
            error: !data ? message : error,
        };
    };

    static async get(url) {
        return axios.get(url).then(this.resolveResponse).catch(this.handleError);
    }

    static async post(url, data, params = {}) {
        return axios.post(url, data, { params }).then(this.resolveResponse).catch(this.handleError);
    }

    static async put(url, data) {
        return axios
            .put(url, data)
            .then(this.resolveResponse)
            .catch(this.handleError);
    }

    static async patch(url, data) {
        return axios
            .put(url, data)
            .then(this.resolveResponse)
            .catch(this.handleError);
    }

    static async delete(url, data) {
        return axios
            .delete(url, data)
            .then(this.resolveResponse)
            .catch(this.handleError);
    }
}

export default Service;
