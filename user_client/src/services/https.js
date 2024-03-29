import axios from 'axios';
import LocalStorage from '../helpers/localStorage';

const baseURL = "/api";
const token = LocalStorage.getToken();

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.headers.Authorization = token
    ? `Bearer ${token}`
    : null;

export default axios;
/**
 * Guess Derick will use his approach to speed the development up
 */