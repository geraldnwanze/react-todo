import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterEmailPage() {
    const [registerEmailForm, setRegisterEmailForm] = useState({email: ""});

    function handleInput(e) {
        const {name, value} = e.target;
        setRegisterEmailForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <section className="w-full pt-32">
            <div className="container w-10/12 lg:w-1/3 mx-auto bg-gray-900 rounded-lg py-20">
                <h2 className="text-2xl font-bold text-center mb-8 text-white">Register</h2>
                <form method="POST" action="#">
                
                <div className="relative z-0 w-8/12 mx-auto mb-6 group">
                    <input onChange={(e) => handleInput(e)} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={registerEmailForm.email} />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-10/12 lg:w-8/12 mx-auto mb-6 group">
                    <div className="g-recaptcha" data-sitekey="#"></div>
                </div>
                <div className="text-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
                </form>
                <div className="w-full lg:w-1/2 mt-5 ml-5 lg:text-center">
                <Link to="/auth/login" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Login?</Link>
                </div>
            </div>
        </section>
    )
}

export default RegisterEmailPage;