import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import useAuthApi from "../../hooks/useAuthApi";
import BaseContext from "../../contexts/BaseContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import Spinner from "../loading/Spinner";

function HeaderLayout(props) {
    const [loading, setLoading] = useState(false);
    const { setErrors, setSuccess } = useContext(BaseContext);
    const { isAuth, setIsAuth, setUser } = useContext(AuthContext);
    const { logout } = useAuthApi();
    const { removeItem } = useLocalStorage();
    
    function handleLogout() {
        setLoading(prev => true);
        
        logout()
            .then((response) => {
                removeItem('user');
                removeItem('token');
                setIsAuth(prev => false);
                setUser(prev => {});
                setSuccess(prev => response.data.success);
            })
            .catch((error) => {
                setErrors(prev => error.response.data.error)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(prev => false);
                    setErrors(prev => false);
                    setSuccess(prev => null);
                }, 3000);
            })

    }

    return (
        <nav className="bg-gray-900 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{props.app.name}</span>
                </Link>
                <div className="flex md:order-2">
                    {
                        isAuth
                        &&

                        (
                            loading
                            ?
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Spinner />
                            </button>
                            :
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ handleLogout }>Logout</button>
                        )
                    }
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            isAuth
                            &&
                            <>
                                <li>
                                    <Link to={props.links.tasks.home} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link to={props.links.tasks.search} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white" aria-current="page">Search</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default HeaderLayout;