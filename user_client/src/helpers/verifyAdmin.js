import jwtDecode from "jwt-decode";
import LocalStorage from "./localStorage";

const checkIsAdmin = (token = LocalStorage.getToken()) => {
    const { role } = jwtDecode(token);
    return role === 'admin';
};

export default checkIsAdmin;