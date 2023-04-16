import { createContext } from "react";

const AuthContext = createContext({user: null, setUser: () => {}, isAuth: false, setIsAuth: () => {}});

export default AuthContext;
