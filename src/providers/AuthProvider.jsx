import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const data = JSON.parse(getItem('user'));
        
        if (data) {
            setUser(prev => JSON.parse(data));
            setIsAuth(prev => !prev);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <AuthContext.Provider value={{user, setUser, isAuth, setIsAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;