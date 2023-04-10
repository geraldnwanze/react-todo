import { useState } from "react";
import AuthContext from "../contexts/auth";
import useAuth from "../hooks/useAuth";

function AuthProvider(props) {
    const [user, setUser] = useState();
    const {logout} = useAuth();

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;