import { useState } from "react";
import BaseContext from "../contexts/BaseContext";

const links = {
    home: "/",
    login: "/auth/login",
    tasks: {
        home: "/tasks",
        search: "/tasks/search"
    },
}

const apis = {
    base_url: process.env.REACT_APP_API_BASE_URL,
    logout: "/logout",
    auth: {
        login: "/auth/login"
    }
}

const app = {
    name: "Todo App"
}

function BaseProvider(props) {
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [requestResponse, setRequestResponse] = useState(null);
    
    return (
        <BaseContext.Provider value={
            {
                links, 
                apis, 
                app, 
                errors, setErrors, 
                success, setSuccess, 
                requestResponse, setRequestResponse
            }
        }>
            {props.children}
        </BaseContext.Provider>
    )
}

export default BaseProvider;