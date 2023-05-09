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
    auth: {
        login: "/auth/login",
        logout: "logout"
    },
    tasks: {
        index: "/tasks",
        search: "/tasks/search",
        store: "/tasks/store",
        update: "/tasks/update",
        complete: "/tasks/complete",
        destroy: "/tasks/delete"
    }
}

const app = {
    name: "Todo App"
}

function BaseProvider(props) {
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [pagination, setPagination] = useState({});
    
    return (
        <BaseContext.Provider value={
            {
                links, 
                apis, 
                app, 
                errors, setErrors, 
                success, setSuccess, 
                pagination, setPagination
            }
        }>
            {props.children}
        </BaseContext.Provider>
    )
}

export default BaseProvider;