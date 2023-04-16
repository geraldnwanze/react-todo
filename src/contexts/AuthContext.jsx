import { createContext } from "react";

const AuthContext = createContext({user: {}, setUser: () => {}, isAuth: false, setIsAuth: () => {}});

export default AuthContext;
