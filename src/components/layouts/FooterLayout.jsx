import { Link } from "react-router-dom";

function FooterLayout(props) {
    return (
        <footer className=" bottom-0 left-0 z-20 w-full p-4 bg-gray-900 border-t border-gray-200 shadow text-center md:p-6 dark:bg-gray-900 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023 <Link to={props.links.home} className="hover:underline">{props.app.name}</Link>. All Rights Reserved.
            </span>
        </footer>
    )
}

export default FooterLayout;