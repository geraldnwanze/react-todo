import { createContext } from "react";

const BaseContext = createContext({
    apis: "",
    errors: null, setErrors: () => {},
    success: null, setSuccess: () => {},
    loading: false, setLoading: () => {}
});

export default BaseContext;