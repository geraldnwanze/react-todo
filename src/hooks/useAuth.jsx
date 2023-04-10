import { useContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useUser from "./useUser";
import axios from "axios";
import BaseContext from "../contexts/base";

function useAuth() {
    const {user, addUser, removeUser} = useUser();
    const {getItem} = useLocalStorage();
    const { links } = useContext(BaseContext);

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            addUser(JSON.parse(user));
        }
    }, []);

    function login(user) {
        addUser(user);
    }

    function logout() {
        removeUser();
    }

    return {user, login, logout}
}

export default useAuth;