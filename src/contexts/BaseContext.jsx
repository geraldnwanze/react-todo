import { createContext } from "react";

const BaseContext = createContext({
    links: {}, 
    apis: {}, 
    app: {}, 
    errors: null, setErrors: () => {},
    success: null, setSuccess: () => {},
    pagination: null, setPagination: () => {}
});

export default BaseContext;