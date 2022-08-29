import jwtDecode from 'jwt-decode';
import LocalStorage from './localStorage';

const getCurrentUser = (token = LocalStorage.getToken()) => {
    if (token && jwtDecode(token)) {

        return jwtDecode(token);

    }
    return null;
};

export default getCurrentUser;
