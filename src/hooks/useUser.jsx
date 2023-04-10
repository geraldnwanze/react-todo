import { useContext } from "react";
import AuthContext from "../contexts/auth";
import useLocalStorage from "./useLocalStorage";

function useUser() {
    const {user, setUser} = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    function addUser(user) {
        setItem('user', JSON.stringify(user));
        setUser(user);
    }

    function removeUser() {
        setItem('user', '');
        setUser(null);
    }

    return {user, addUser, removeUser}
}

export default useUser;