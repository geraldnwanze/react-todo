import axios from "axios";
import useLocalStorage from "./useLocalStorage";
import { useContext } from "react";
import BaseContext from "../contexts/BaseContext";
import AuthContext from "../contexts/AuthContext";

function useAxios() {
    const {  removeItem } = useLocalStorage();
    const { setErrors } = useContext(BaseContext);
    const { setUser, setIsAuth } = useContext(AuthContext);
    const { getItem } = useLocalStorage();


    const client = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}`
    });
    
    client.interceptors.request.use((config) => {
        const token = getItem('token') ? JSON.parse(getItem('token')) : '';
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json";
        return config;
    });

    client.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (!navigator.onLine) {
            setErrors(prev => `You are offline`)
            setTimeout(() => {
                setErrors(prev => null);
            }, 1000);
            return error;
        }
        // if (error.name === `AxiosError`) {
        //     setErrors(prev => error.message);

        //     setTimeout(() => {
        //         setErrors(prev => null);
        //     }, 1000);
        //     return;
        // }
        if (error.response && error.response.status === 401) {

            setTimeout(() => {
                setErrors(prev => error.response.data.error);
            }, 5000);

            setTimeout(() => {
                setUser(prev => {});
                setIsAuth(prev => false);
                removeItem('token')
                removeItem('user');
                setErrors(prev => null);
            }, 6000);
            return error;
        }
        throw error;
    })

    return { client }
}

export default useAxios;