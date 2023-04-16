import axios from "axios";
import { useContext } from "react";
import BaseContext from "../contexts/BaseContext";
import AuthContext from "../contexts/AuthContext";
import useLocalStorage from "./useLocalStorage";

function useLoginApi() {
    const { apis, setErrors, setSuccess } = useContext(BaseContext);
    const { user, setUser, setIsAuth } = useContext(AuthContext);
    const { setItem } = useLocalStorage();
    const base_url = apis.base_url;
    const token = user ? user.token : '';

    async function login(user) {
        const url = base_url + apis.auth.login;
        
        const response = await axios.post(url, user, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }).then((response) => {
            const data = response.data;
            const successMessage = data.message;
            const userData = data.data;
            
            setItem('user', JSON.stringify(userData));
            setUser(prev => userData);
            setSuccess(prev => successMessage);
            setIsAuth(prev => true);
            return true;
        }).catch((error) => {
            const errorMessage = error.response.data.message;
            setErrors(prev => errorMessage);
            return false;
        }).finally(() => {
            
            setTimeout(() => {
                setErrors(prev => null);
                setSuccess(prev => null);
            }, 3000);
            
        })
        
        return response;

    }

    function logout() {
        const url = base_url + apis.logout;

        axios.post(url, [], {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }).then((response) => {
            setSuccess(prev => response.data.message);
            setItem('user', null);
            setUser(prev => null);
            setIsAuth(prev => false);
            
        }).catch((error) => {
            setErrors(prev => error.response.data.message);
        })

        setTimeout(() => {
            setErrors(prev => null);
            setSuccess(prev => null);
        }, 5000);
    }

    return { login, logout }
}

export default useLoginApi;