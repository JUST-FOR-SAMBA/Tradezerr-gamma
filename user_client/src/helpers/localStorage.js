import keys from "./utils/keys";

class LocalStorage {

    static setToken(value) {
        localStorage.setItem(keys.TOKEN_STORAGE_KEY, value);
    }
    static setRole(value) {
        localStorage.setItem('roles', value);
    }

    static getRole() {
        return localStorage.getItem('roles');
    }
    static getToken() {
        return localStorage.getItem(keys.TOKEN_STORAGE_KEY);
    }

    static removeToken() {
        localStorage.removeItem(keys.TOKEN_STORAGE_KEY);
    }

    static clear() {
        localStorage.clear();
    }
}

export default LocalStorage;

