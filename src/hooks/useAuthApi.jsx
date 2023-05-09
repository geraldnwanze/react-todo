import { useContext } from "react";
import useAxios from "./useAxios";
import BaseContext from "../contexts/BaseContext"

function useAuthApi() {
    const { client } = useAxios();
    const { apis } = useContext(BaseContext);
    const loginUrl = apis.auth.login;
    const logoutUrl = apis.auth.logout;

    function login(user) {
        return client.post(loginUrl, user);
    }

    function logout() {
        return client.post(logoutUrl);
    }

    return { login, logout }
}

export default useAuthApi;