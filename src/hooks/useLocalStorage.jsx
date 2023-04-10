import { useState } from "react";

function useLocalStorage() {
    const [value, setValue] = useState();

    function setItem(key, value) {
        localStorage.setItem(key, value);
        setValue(prev => value);
    }

    function getItem(key) {
        const value = localStorage.getItem(key);
        setValue(prev => value);
        return value;
    }

    function removeItem(key) {
        localStorage.removeItem(key);
        setValue(null);
    }

    return { value, setItem, getItem, removeItem }
}

export default useLocalStorage;