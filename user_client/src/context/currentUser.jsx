import axios from "axios";
import { useContext, createContext } from "react";
import { useQuery } from "react-query";
import getCurrentUser from "../helpers/currentUser";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

const UserDataProvider = ({ children }) => {
    const id = getCurrentUser();

    const handlerFetchUserData = async () => {

        const res = await axios.get(`/users/${id ? id.id : null}`);
        if (!res) {
            return;
        }
        return res.data.data;
    }

    const { data, isLoading } = useQuery('profileAvatar', handlerFetchUserData, {
        enabled: id === null ? false : true,

    }
    )

    return (
        <UserDataContext.Provider
            value={{
                data,
                isLoading
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};
export default UserDataProvider;
