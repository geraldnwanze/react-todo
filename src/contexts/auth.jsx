const { createContext } = require("react");

const AuthContext = createContext({user: null, setUser: () => {}});

export default AuthContext;