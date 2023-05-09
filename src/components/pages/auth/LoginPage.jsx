import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import useAuthApi from "../../../hooks/useAuthApi";
import BaseContext from "../../../contexts/BaseContext";
import useLocalStorage from "../../../hooks/useLocalStorage";
import AuthContext from "../../../contexts/AuthContext";
import Spinner from "../../loading/Spinner";

function LoginPage() {
    const [loginForm, setLoginForm] = useState({email: "kiddikay1@gmail.com", password: "123", "g-recaptcha-response": ""});
    const [loading, setLoading] = useState(false);
    const { login } = useAuthApi();
    const { setItem } = useLocalStorage();
    const { setErrors, setSuccess } = useContext(BaseContext);
    const { setUser, setIsAuth } = useContext(AuthContext);

    function handleInput(e) {
        const {name, value} = e.target;
        setLoginForm(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    function handleCaptcha(e) {
        setLoginForm({
            ...loginForm,
            'g-recaptcha-response': e
        })
        
    }

    function handleLogin(e) {
        e.preventDefault();
        
        setLoading(prev => true);

        login(loginForm)
            .then(response => {
                const message = "Login was successful";
                setSuccess(prev => message);

                const userData = {
                    id: response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                    active: response.data.active
                }
                const tokenData = response.data.token;

                setItem('user', JSON.stringify(userData));
                setItem('token', JSON.stringify(tokenData));
                setUser(prev => userData);
                setIsAuth(prev => true);
                

            }).catch(error => {
                setErrors(prev => error.response.data.errors);
            }).finally(() => {
                setTimeout(() => {
                    setLoading(prev => false);
                    setErrors(prev => null);
                    setSuccess(prev => null);
                }, 1000)
            })

    }

    return (
        <section className="w-full pt-32">
            
            <div className="container w-10/12 lg:w-1/3 mx-auto bg-gray-900 rounded-lg py-20">
                <h2 className="text-2xl font-bold text-center mb-8 text-white">Login Form</h2>
                <form method="POST">
               
                <div className="relative z-0 w-8/12 mx-auto mb-6 group">
                    <input onChange={(e) => handleInput(e)} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={loginForm.email} required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-8/12 mx-auto mb-6 group">
                    <input onChange={(e) => handleInput(e)} type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={loginForm.password} required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-10/12 lg:w-8/12 mx-auto mb-6 group">
                    <ReCAPTCHA sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY} onChange={(e) => handleCaptcha(e)} />
                </div>
                <div className="text-center">
                    { 
                        loading 
                        ? 
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Spinner />
                        </button> 
                        : 
                        <button onClick={(e) => handleLogin(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> 
                    }
                    
                </div>
                </form>
                <div className="w-1/2 mt-5 text-center">
                <Link to="/auth/register-email" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Create Account?</Link>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;