import jwtDecode from 'jwt-decode';
import LocalStorage from './localStorage';


const isExpired = (token = LocalStorage.getToken()) => {
    if (!token) {
        return true;
    }
    if (token && jwtDecode(token)) {
        const decode = jwtDecode(token);
        const expiry = decode.exp;
        const now = new Date();
        const expired = now.getTime() > expiry * 1000;

        if (expired) {
            LocalStorage.removeToken();
        }

        return expired;
    }
    return false;
};
export default isExpired;